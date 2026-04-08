require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
});

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 OpenClaw Bot ทำงานแล้ว!");
});