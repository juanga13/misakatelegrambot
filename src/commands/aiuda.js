module.exports = (context, args) => {
    const aiudaCommands = [
        {key: 'aiuda', description: 'Mostrar este mensaje'},
        {key: 'mbti', description: 'Mostrar todos los MBTI de este grupo. Para mas opciones: "/mbti aiuda"'},
    ]

    return (
        'Todos los comandos:\n' +
        aiudaCommands.map((item) => '- ' + item.key + ': ' + item.description + '.').join('\n')
    )
}