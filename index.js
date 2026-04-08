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
  const chatId = msg.chat.id;
  const userText = msg.text;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "คุณคือ AI สายขายของ ตอบเก่ง ปิดการขายได้" },
        { role: "user", content: userText }
      ]
    });

    const reply = res.choices[0].message.content;

    bot.sendMessage(chatId, reply);
  } catch (err) {
    bot.sendMessage(chatId, "❌ AI error");
  }
});