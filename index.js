require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
});

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const res = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: "hello" }
  ],
});

    const reply = res.choices[0].message.content;

    bot.sendMessage(chatId, reply);
  } catch (err) {
    bot.sendMessage(chatId, "❌ AI error");
  }
});