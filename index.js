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
    console.error(`Instagram Login Error : ${ )
  
