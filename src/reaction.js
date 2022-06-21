const MESSAGE_TYPES = require("./const")

/**
 * @description manages reactions, meaning it can reply at every
 * message if the regex is meet
 * 
 * @param {string} msg
 */
module.exports = (context, msg) => {
    let reaction;
    Object.values(REACTIONS).forEach((r) => {
        if (r.regex.test(msg)) reaction = r
    })
    console.log(reaction)
    if (!reaction) return { msg: null, options: null }
    return {
        msg: reaction.message(msg),
        options: reaction.reply,
    }
}

/**
 * Reactions constant
 * 
 * Item fields:
 * - regex: regex to test if matches or not
 * - type: message type defined from const.js
 * - message: callback that calculates the returned message
 * - reply: should message be a reply or not
 */
const REACTIONS = [
    {
        regex: /^(a{5})+/,
        type: MESSAGE_TYPES.TEXT,
        message: (msg) => {
            const adding = Math.floor(Math.random() * msg.length);
            const final =  (msg + `A`.repeat(adding));
            return final;
        },
        reply: false,
    },
    {
        regex: /(8|ocho)$/,
        type: MESSAGE_TYPES.TEXT,
        message: () => 'El culo te abrocho',
        reply: true,
    },
    {
        regex: /(9|nueve)$/,
        type: MESSAGE_TYPES.TEXT,
        message: () => 'El culo te llueve',
        reply: true,
    },
]
