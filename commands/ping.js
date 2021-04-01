module.exports = {
    name: 'ping',
    description: 'This is a ping command.',
    execute(message, embed, webHook, args){
        embed.setTitle('Pong')
        embed.setColor('#008000')
        webHook.send('', {
            username: 'ChoronoOne',
            avatarURL: 'https://imgur.com/M2uFwtY.png',
            embeds: [embed],
        })
    }
    
}