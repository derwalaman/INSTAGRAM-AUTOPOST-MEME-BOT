// to make requires to web api's and fetch the required data
const axios = require('axios');

// file system module
const fs = require('fs');

// used for compromising and resizing image as per the instagram required dimensions
const sharp = require('sharp');

// instagram api for login and uploading image
const { IgApiClient } = require('instagram-private-api');

// to create a json file to store the data of posted memes , prevent from posting the same meme again !!
function initializePostedMemes(filePath){
  if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
}

// reading url's of previously posted memes from the json file created to store the url's as the meme gets posted 
function fetchPastMemes(filePath){
  try {
    const content = fs.readFileSync(filePath);
    return JSON.parse(content.toString());
  } catch (error){
    console.error(`Failed to read past memes file: ${error.message}`);
    return {};
  }
}

// downloading and processing the image as per the dimensions or limits of instagram
async function downloadAndProcessingImage(url){
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer'
    });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const processedImageBuffer = await sharp(imageBuffer).resize({width: 1080, height: 1080, fit: 'inside' }).jpeg({quality: 80 }).toBuffer();
    return processedImageBuffer;
  } catch (error){
    console.error(`Failed to download and process image : ${error.message}`);
    return null;
  }
}

// function to login to instagram
async function loginToInstagram(ig , username , password){
  try {
    const auth = await ig.account.login(username , password);
    if(!auth.pk){
      console.error("Login Failed !!");
      return null;
    }
    return auth;
  } catch (error){
    console.error(`Instagram Login Error : ${error.message}`);
    return null;
  }
}

// fetch random memes url from the meme-api.com
async function fetchRandomMemeUrl(){
  try{
    const res = await axios.get('https://meme-api.com/gimme');
    return res.data.url;
  } catch (error){
    console.log(`Failed to fetch random meme url : ${error.message}`);
    return null;
  }
}

// upload meme to instagram
async function uploadMemeToInstagram(ig, imageBuffer, caption) {
  try{
    const publishResult = await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });
    return publishResult;
  } catch (error){
    console.error(`Failed to upload meme to Instagram: ${error.message}`);
    return null;
  }
}

// final main function
async function postMeme(){

  // set username and password 
  const posted_animes_location = './posted_memes.json';
  const ig_uname = 'YOUR_USERNAME'; // Replace `YOUR_USERNAME` with your instagram username.
  const ig_pass = 'YOUR_PASSWORD'; // Replace `YOUR_PASSWORD` with your instagram password.

  // initialize the posted memes files
  initializePostedMemes(posted_animes_location);

  const ig = new IgApiClient();
  ig.state.generateDevice(ig_uname);

  // fetching past memes 
  let posted_memes = fetchPastMemes(posted_animes_location);

  // fetching a random meme
  let memeUrl = await fetchRandomMemeUrl();
    if (!memeUrl || posted_memes[memeUrl]) {
        console.log("Seen this or failed to fetch a new meme!");
        // postMeme();
        return;
    }

    // Logging into Instagram
    const auth = await loginToInstagram(ig, ig_uname, ig_pass);
    if (!auth) {
        console.error("Failed to login to Instagram");
        return;
    }

    // Downloading and processing the image
    const imageBuffer = await downloadAndProcessingImage(memeUrl);
    if (!imageBuffer) {
        console.error("Failed to download image, skipping meme");
        return;
    }

    // Uploading a meme
    const caption = `Here is a meme for you! ¯\\_(ツ)_/¯\n.\n.\n.\namanderwal`;
    const publishResult = await uploadMemeToInstagram(ig, imageBuffer, caption);

    if (publishResult) {
        console.log(`Successfully posted meme from URL: ${memeUrl}`);
        // Save the posted meme to prevent re-posting
        posted_memes[memeUrl] = true;
        fs.writeFileSync(posted_animes_location, JSON.stringify(posted_memes, null, 2));
    } else {
        console.error(`Failed to post meme from URL: ${memeUrl}`);
    }
}

// Start the initial posting
postMeme();
