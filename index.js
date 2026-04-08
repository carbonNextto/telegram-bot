require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  if (msg.from.is_bot) return;

  const chatId = msg.chat.id;

  try {
    // เรียก DeepSeek API
    const res = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "คุณคือ AI สายช่วยทำงานและขายของ ตอบลูกค้าเก่ง ปิดการขายได้" },
            { role: "user", content: msg.text }
          ]
        })
      }
    );

    const data = await res.json();

    const reply = data.choices?.[0]?.message?.content || "❌ ขอโทษ ไม่สามารถตอบได้";

    await bot.sendMessage(chatId, reply);

  } catch (err) {
    console.log(err);
    bot.sendMessage(chatId, "❌ เกิดข้อผิดพลาด AI");
  }
});