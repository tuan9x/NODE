const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1111:xxxxxxx';
const chatId = "-333333";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});

// send Message 
bot.sendMessage(chatId, 'Received your message');


// bot.sendMessage(chatId, 'Received your message');
const url = 'https://avatars.githubusercontent.com/u/392586666';
bot.sendPhoto(chatId, url);