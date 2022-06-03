const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({ puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}});
console.log('Connecting...');

let welcomeMsg = `╭───── • 𒀭 • ─────╮
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
𝄪𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐄𝐥𝐥𝐢𝐞𝄪`

client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
	if(message.body === 'استمارة') {
		message.reply(welcomeMsg);
	}
});
console.log('Initializing...');
client.initialize();