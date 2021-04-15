const { WAConnection, MessageType, Presence, Mimetype, GroupSettingChange, ChatModification } = require('@adiwajshing/baileys')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const axios = require('axios')
const fs = require('fs')
const lolis = require('lolis.life')
const loli = new lolis()
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))

prefix = "!"
blocked = []
fakeinfo = "*BOT WHATSAPP*"


/* ====>NOMER OWNER <====== */
const ownerNumber = ["6283856085455@s.whatsapp.net","6283833847406@s.whatsapp.net"]
/* ====>NOMER OWNER <====== */

function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`}


async function starts() {
const client = new WAConnection()
client.logger.level = 'warn'
console.log(banner.string)
client.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.on('connecting', () => {
start('2', 'Connecting...')})
client.on('open', () => {
success('2', 'Connected')})
await client.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))



/*======> WELCOME <==========*/
client.on('group-participants-update', async (anu) => {
if (!welkom.includes(anu.jid)) return
try {
const mdata = await client.groupMetadata(anu.jid)
console.log(anu)
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
let buff = await getBuffer(ppimg)
client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
teks = `Sayonara @${num.split('@')[0]}👋`
let buff = await getBuffer(ppimg)
client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})}
} catch (e) {
console.log('Error : %s', color(e, 'red'))}})

client.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))}})

client.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (mek.key.fromMe) return
global.prefix
global.blocked
const botNumber = client.user.jid
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const isGroup = from.endsWith('@g.us')
const type = Object.keys(mek.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)
const sender = isGroup ? mek.participant : mek.key.remoteJid
const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isWelkom = isGroup ? welkom.includes(from) : false
const isNsfw = isGroup ? nsfw.includes(from) : false
const isOwner = ownerNumber.includes(sender)
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
client.chatRead(from)
colors = ['red','white','black','blue','yellow','green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
if (!isGroup && isCmd) console.log('├', color(command), 'dari', color(sender.split('@')[0], "yellow"), 'di', color("private chat", "blue"))
if (!isGroup && !isCmd) console.log('├', color('Pesan'), 'dari', color(sender.split('@')[0], "yellow"), 'di', color("private chat", "blue"))
if (isCmd && isGroup) console.log('├', color(command), 'dari', color(sender.split('@')[0], "yellow"), 'di', color(groupName, "blue"))
if (!isCmd && isGroup) console.log('├', color('Pesan'), 'dari', color(sender.split('@')[0], "yellow"), 'di', color(groupName, "blue"))
nameuser= client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined	
let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
if (authorname != undefined) { } else { authorname = nameuser }	
			
function addMetadata(packname, author) {	
if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
author = author.replace(/[^a-zA-Z0-9@]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
const json = {	
"sticker-pack-name": packname,
"sticker-pack-publisher": author,}
const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
let len = JSON.stringify(json).length	
let last	
if (len > 256) {	
len = len - 256	
bytes.unshift(0x01)	
} else {	
bytes.unshift(0x00)}	

if (len < 16) {	
last = len.toString(16)	
last = "0" + len	
} else {	
last = len.toString(16)}	

const buf2 = Buffer.from(last, "hex")	
const buf3 = Buffer.from(bytes)	
const buf4 = Buffer.from(JSON.stringify(json))	

const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
return `./src/stickers/${name}.exif`	
})	

}

const reply = (teks) => {
client.sendMessage(from, teks, text, {quoted:mek})}

const sendMess = (hehe, teks) => {
client.sendMessage(hehe, teks, text)}


const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})}

switch(command) {
	
case "help":
case "menu":
const options = { contextInfo: { forwardingScore: 890, isForwarded: true, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', quotedMessage: { imageMessage: { caption: fakeinfo, jpegThumbnail: "(./image/fake.jpg)"}}}}
viewmenu =` *MENU USER* 
 ${prefix}stiker
 ${prefix}stikergif
 ${prefix}hidetag
 ${prefix}toimg`
await client.sendMessage(from, viewmenu, MessageType.text, options)
break

case 'hidetag':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
var value = body.slice(9)
var group = await client.groupMetadata(from)
var member = group['participants']
var mem = []
member.map( async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var teci = {
text: value,
contextInfo: { mentionedJid: mem },
quoted: mek
}
client.sendMessage(from, teci, text)
break

case 'leave':
case 'out':
if (!isGroup) return reply(mess.only.group)
if (isGroupAdmins || isOwner) {
client.groupLeave(from)
} else {
reply(mess.only.admin)
}

case 'bc':
if (!isOwner) return reply('Kamu siapa?')
if (args.length < 1) return reply('.......')
anu = await client.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await client.downloadMediaMessage(encmedia)
for (let _ of anu) {
client.sendMessage(_.jid, buff, image, {caption: `*[BROADCAST BOT]*\n\n${body.slice(4)}`})}
reply('Suksess broadcast')
} else {
for (let _ of anu) {
sendMess(_.jid, `*[Broadcast Bot]*\n\n${body.slice(4)}`)}
reply('Suksess broadcast')}
break

case 'clearall':
if (!isOwner) return reply('Kamu siapa?')
anu = await client.chats.all()
client.setMaxListeners(25)
for (let _ of anu) {
client.deleteChat(_.jid)
}
reply('Sukses delete all chat :)')
break

case 'clone':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Tag target yang ingin di clone')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
try {
pp = await client.getProfilePicture(id)
buffer = await getBuffer(pp)
client.updateProfilePicture(botNumber, buffer)
mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
} catch (e) {
reply('Gagal om')}
break

case 'delete':
case "del":
client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
break

case "join":
if (!isOwner) return reply(mess.only.ownerB)
const groupi = await client.acceptInvite (body.slice(32))
reply("Berhasil gabung ke group")
break

case "owner":
case "creator":
case "admin":
const owner = 'BEGIN:VCARD\n'
 + 'VERSION:3.0\n' + 'FN:Riyann\n'
 + `ORG:Owner Bot ;\n`
 + `TEL;type=CELL;type=VOICE;waid=6283856085455:62 838-5608-5455\n`
 + 'END:VCARD' 
client.sendMessage(from, {displayname: "Jeff", vcard: owner}, MessageType.contact, { quoted: mek})
break

case "pinterest":
case "pin":
data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
rindim = JSON.parse(JSON.stringify(data));
rondom =  rindim[Math.floor(Math.random() * rindim.length)];
hasile = await getBuffer(rondom)
client.sendMessage(from, hasile, image, {quoted: mek, caption: "nih kak"})
break

case "play":
case "Play":
teksnya = body.slice(6)
data = await fetchJson(`https://docs-jojo.herokuapp.com/api/yt-play?q=${teksnya}`)
halsi = `_*Lagu berhasil ditemukan*_
*Judul:* ${data.title}
*Durasi:* ${data.duration}
*Size:* ${data.filesize}

*Tunggu sedang mendownload*`
thumbnail = await getBuffer(data.thumb)
client.sendMessage(from, thumbnail, image, {quoted: mek, caption: halsi})
buffer = await getBuffer(data.link)
client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${data.title}.mp3`, quoted: mek})
break

case 'attp':
if (args.length < 1) return reply("Masukin teksnya!!")
textnya = body.slice(6)
buperr = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(textnya)}`)
client.sendMessage(from, buperr, sticker, {quoted: mek})
break

case "quotes":
data = await fetchJson(`https://docs-jojo.herokuapp.com/api/randomquotes`)
quotes = `${data.quotes}`
client.sendMessage(from, quotes, text, {quoted: mek})
break

default:
}
} catch (e) { 
console.log('Error : %s', color(e, 'red'))
}})}
starts()
