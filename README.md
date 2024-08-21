# Instagram AutoPost Meme Bot

## Overview

This project is an Instagram bot designed to automatically post memes fetched from the internet to your Instagram account. The bot can handle different categories of memes (sports, college, politics, etc.) and is set up to post memes at regular intervals.

## Features

- **Automated Meme Posting**: Posts memes automatically to Instagram.
- **Category Diversity**: Posts memes related to different topics such as Indian context, sports, college, and politics.
- **Customizable Posting Interval**: Set your preferred posting interval for automatic posting (e.g., one meme per minute).
- **Authentication**: Uses Instagram credentials to log in and post on your behalf.

## How It Works

1. **Fetching Memes**: The bot fetches memes from the internet or predefined sources.
2. **Posting**: Automatically logs into your Instagram account and posts the meme at the interval defined in the script.
3. **Error Handling**: Automatically retries in case of errors, and it handles previously posted memes to avoid duplication.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **Instagram Account**: You need an Instagram account to post the memes. 

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/derwalaman/INSTAGRAM-AUTOPOST-MEME-BOT.git
   cd INSTAGRAM-AUTOPOST-MEME-BOT
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a .env file in the root of the project:

   ```bash
   touch .env
   ```

   Add the following content to the .env file:

   ```bash
   IG_USERNAME=your_instagram_username
   IG_PASSWORD=your_instagram_password
   ```

4. Run the bot locally:

   ```bash
   node index.js
   ```

## Disclaimer

This bot is intended for educational purposes only. Automating actions on Instagram may violate their terms of service, and use it at your own risk.




