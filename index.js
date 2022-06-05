const e = require("express");
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
  authStrategy: new LocalAuth({ clientId: "SnowyBot" }),
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


let dataChat1 = null;
let dataChat2 = null;
let chat1 = null;
let chat2 = null;
let isSetting = 0;
let setter = "";

client.on("qr", (qr) => {
  console.log("QR RECEIVED");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  app.listen(8000);
});
client.on("message", (msg) => {
  msg.getChat().then(async (chat) => {
    if (isSetting > 0) {
      console.log("Setting for: " + isSetting);
      if (isSetting === 1) {
        chat1 = msg.body;
      } else if (isSetting === 2) {
        chat2 = msg.body;
      } else {
        msg.reply("Something went wrong");
        return;
      }
      
      console.log("Setting done chat count: ");
      await chat.sendMessage("Setting done for chat: " + isSetting);
      isSetting = 0;
      setter = "";
    }
    if (chat.name == "⎱𝐄𝐥𝐥𝐢𝐞 𒀭 الاستقبال⎰") {
      if (formMsgs.includes(msg.body) || formMsgs.some(v => msg.body.includes(v)) && msg.body.split(" ").length < 3) {
        msg.reply(form);
      }else if (islamicHi.includes(msg.body) || islamicHi.some(v => msg.body.includes(v))){
        msg.reply(islamicHiReply[Math.floor(Math.random() * islamicHiReply.length)])
      }else if (informalHi.includes(msg.body) || informalHi.some(v => msg.body.includes(v)) && msg.body.split(" ").length < 3) {
        msg.reply(informalHiReply[Math.floor(Math.random() * informalHiReply.length)])
      }
    } else {
      if (msg.body.startsWith("/setchat")) {
        let num = msg.body.split(" ")[1];
        if (num == "1") {
          dataChat1 = chat;
          msg.reply(
            "Data chat was set to his chat please type in a group name to collect from"
          );
          isSetting = 1;

          setter = msg.from;
        } else if (num == "2") {
          dataChat2 = chat;
          msg.reply(
            "Data chat was set to his chat please type in a group name to collect from"
          );
          isSetting = 2;
          setter = msg.from;
        } else {
          isSetting = 0;
          msg.reply("use the command: /setchat 1/2");
        }
        return;
      }
      if (chat1 == null && chat2 != null) {
        console.log("No data chats");
        // msg.author.send("Please set chat first");
        return;
      } else {
        if (chat.isGroup) {
          console.log(chat.name + " is a group");
          // Check if an end message:
          if (msg.body.includes("∷⊱ انتهت ⊰∷")) {
            console.log("End message");
            let dataChat;
            if (chat.name == chat1){
              dataChat = dataChat1;
            }else if (chat.name == chat2){
              dataChat = dataChat2;
            }else{
              console.log("Chat not found");
              return;
            }
            if (dataChat) {
              console.log("Found chat");
              // Get the name of the winner
              const mentions = await msg.getMentions();
              if (mentions.length > 0) {
                const winner = mentions[0];
                let name = msg.body.slice(
                  msg.body.indexOf("الفائز") + 6,
                  msg.body.lastIndexOf("✺")
                );
                name = name.replace(" ", "");
                name = name.replace(":", "");
                name = name.replace("\n", "");
                name = name.replace("\n", "");
                name = name.replace("\n", "");

                let amount = msg.body.slice(
                  msg.body.indexOf("الجائزة" || "الجائزه") + 7,
                  msg.body.lastIndexOf("k")
                );

                amount = amount.replace(",", "");
                amount = amount.replace(" ", "");
                amount = amount.replace(":", "");
                amount = amount.replace("\n", "");
                // Get the winner mention/number
                dataChat.sendMessage(`----------------------
Phone Number: ${winner.number}
Name if mentioned: ${name}
Amount: ${amount}k
----------------------`);
              }
            } else {
            }
          }
        }
      }
    }
  });
});
console.log("Initializing...");
client.initialize();
