module.exports = (context, args) => {
    const allMembers = context.getChatMembers(context.chat.id);
    console.log(allMembers)
    return 'todos'
}