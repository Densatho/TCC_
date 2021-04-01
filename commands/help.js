module.exports = {
    name: 'help',
    description: 'This command show all commands.',
    execute(message, embed, webHook, args) {

        /*
        commands = []
        const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);

            commands.push({
                name: command.name,
                description: command.description
            })
        }
        */
        embed.setTitle('Help')
        embed.setColor('#FFFF00')
        embed.setAuthor('ChoronoOne', 'https://imgur.com/M2uFwtY.png')

        /*
        commands.forEach(command => {
            embed.addField(command["name"], command["description"], true)
        });
        */
        webHook.send('', {
            username: 'ChoronoOne',
            avatarURL: 'https://imgur.com/M2uFwtY.png',
            embeds: [embed],
        })
    }

}