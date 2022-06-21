const {Telegraf} = require('telegraf')
const dotenv = require('dotenv')
const reaction = require('./reaction')
const commands = require('./commands')

// init
dotenv.config()
const token = process.env.TOKEN
const bot = new Telegraf(token)

// bot.command('id', (context) => {
//     context.reply(context.chat.id)
// })

const isWhitelisted = (chatId) => process.env.WHITELIST.split(',').includes(chatId.toString())
const isCommand = (msg) => msg.slice(0, 1) === '/'

bot.on('text', (context) => {
    if (!isWhitelisted) return
    console.log(context.message.text)
    const messageText = context.message.text.toString().toLowerCase()
    const {msg, options}= reaction(context, messageText)
    if (isCommand(messageText)) {
        const commandReply = commands(context, messageText.slice(1).split(' '))
        _sendMessage(context, commandReply)
    }
    else if (msg) _sendMessage(context, msg, options)
});

const _sendMessage = (context, msg, options) => {
    const now = new Date();
    const isOlder = now.getTime() > (context.message.date * 1000 + 10000);
    if (isOlder) return;
    if (options?.reply) {
        context.reply(msg, {reply_to_message_id: context.message.message_id})
    } else {
        bot.telegram.sendMessage(context.chat.id, msg)
    }
}

// launch and enable graceful stop
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))