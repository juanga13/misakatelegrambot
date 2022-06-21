const aiuda = require("./aiuda")
const mbti = require("./mbti")
const puta = require("./puta")

module.exports = (context, args) => {
    const command = args[0]
    const foundCommand = COMMANDS.find((c) => c.key === command)
    if (!foundCommand) return 'Comando inválido como vos :/'
    return foundCommand.execute(context, args)
}

const COMMANDS = [
    { key: 'aiuda', execute: aiuda },
    { key: 'mbti', execute: mbti },
    { key: 'puta', execute: puta },
]