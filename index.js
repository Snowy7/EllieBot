const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
console.log("Connecting...");

let formMsgs = ["استماره", "استمارة"]
let form = `╭───── • 𒀭 • ─────╮
◘ يُرجى منك تعبئة الاستمارة◘

●اختر اللقب :
「」
●اللقب من انمي :
「」
● اختر نقابه :
「𝐒𝐢𝐥𝐯𝐢𝐚 ✤」
「𝐇𝐮𝐥𝐢𝐚 𖤓」

● ذكر ام انثى :
「」

● كيف حصلت على الروابط :
「」
╰───── • 𒀭 • ─────╯
𝄪𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐄𝐥𝐥𝐢𝐞𝄪`;

let islamicHi = ["السلام عليكم", "سلام عليكم"]
let islamicHiReply = ["وعليكم السلام ورحمة الله وبركاته", "وعليكم السلام"]

let informalHi = ["هلا", "مرحبا"]
let informalHiReply = ["اهلين", "مراحب"]

client.on("qr", (qr) => {
  console.log("QR RECEIVED");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  app.listen(3000);
});
client.on("message", (message) => {
  if (islamicHi.some(v => message.body.includes(v)) && message.body.split(" ").length < 3) {
    message.reply(welcomeMsg);
  }else if (islamicHi.some(v => message.body.includes(v))){
    message.reply(islamicHiReply[Math.floor(Math.random() * islamicHiReply.length)])
  }else if (informalHi.some(v => message.body.includes(v)) && message.body.split(" ").length < 3) {
    message.reply(informalHiReply[Math.floor(Math.random() * informalHiReply.length)])
  }

});
console.log("Initializing...");
client.initialize();
