var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const isMbti = (text) => {
    const length = text.length !== 4
    const hasvalidletter = [['e', 'i'], ['s', 'n'], ['t', 'f'], ['j', 'p']]
        .every((letterPossibles, i) => (
            letterPossibles.includes(text[i])
        ))
    if (text.length !== 4) return false;
    return [['e', 'i'], ['s', 'n'], ['t', 'f'], ['j', 'p']]
        .every((letterPossibles, i) => (
            letterPossibles.includes(text[i])
        ))
}
const addOrUpdateMbti = (chatId, userId, username, mbti) => {
    let mbtiData = JSON.parse(localStorage.getItem('mbti'))
    if (!mbtiData) mbtiData = {};
    mbtiData[chatId] = {...mbtiData[chatId], [username]: mbti}
    localStorage.setItem('mbti', JSON.stringify(mbtiData))
    return true
}
const getAllMbtis = (chatId) => {
    const mbtiData = JSON.parse(localStorage.getItem('mbti'))
    if (!mbtiData) return 'No hay ningún MBTI :('
    const myChatMbtis = mbtiData[chatId]
    if (!myChatMbtis) return 'No hay ningún MBTI :('
    const keys = Object.keys(myChatMbtis)
    if (keys.length === 0) return 'No hay ningún MBTI :('
    else {
        const lines = keys.map((key) => (
            '- ' + key[0].toUpperCase() + key.slice(1).toLowerCase() + ': ' + myChatMbtis[key].toUpperCase() + '.'
        ))
        return 'Todos los MBTI de este grupo:\n' + lines.join('\n')
    }
}

module.exports = (context, args) => {
    const command = args[0]
    const foundCommand = COMMANDS.find((c) => c.key === command)
    if (!foundCommand) return 'Comando inválido como vos :/'
    return foundCommand.execute(context, args)
}

const COMMANDS = [
    {
        key: 'mbti',
        execute: (context, args) => {
            const subCommand = args[1]
            if (!subCommand) return getAllMbtis(context.message.chat.id)
            const subCommandFound = MBTI_SUB_COMMAND.find((sc) => sc.key === subCommand)
            if (!subCommandFound) return `Sub comando de /mbti es invalido (${MBTI_SUB_COMMAND.map((a) => a.key).join(', ')})`
            return subCommandFound.execute(context, args)
        }
    }
]

const MBTI_SUB_COMMAND = [
    {
        key: 'agregar',
        execute: (context, args) => {
            const mbti = args[3]
            if (!isMbti(mbti)) return 'MBTI inválido! (E/I-S/N-T/F-J/P)'
            const who = args[2]
            if (addOrUpdateMbti(context.message.chat.id, context.message.from.id, who, mbti)) {
                return (who[0].toUpperCase() + who.slice(1).toLowerCase()) +
                    ' es ahora un ' + mbti.toUpperCase()
            }
            else return 'No se pudo agregar el MBTI :('
        },
    },
    {
        key: 'aiuda',
        execute: (context, args) => {
            return 'Aiuda: 1) "/mbti" asi nomas para ver todos los mbti.\n2) Para agregar o reemplazar "/mbti agregar nombre mbti"... nombre es el nombre con el que lo queres guardar, y si no es valido el mbti o la palabra "agregar" no va a funcar.'
        }
    }
]