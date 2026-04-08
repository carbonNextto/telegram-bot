require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

bot.on('message', async (msg) => {
  if (!msg.text) return;

  const chatId = msg.chat.id;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "คุณคือ AI ตอบลูกค้าเก่ง" },
        { role: "user", content: msg.text }
      ]
    });

    const reply = res.choices[0].message.content;

    await bot.sendMessage(chatId, reply);
  } catch (err) {
    console.log(err);
    bot.sendMessage(chatId, "❌ AI error: " + err.message);
  }
});