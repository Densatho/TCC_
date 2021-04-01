const functions = require('../functions.js');

module.exports = {
    name: 'help',
    description: 'This command show all commands.',
    execute(message, embed, webHook, args) {

        embed.setTitle('Help');
        embed.setColor('#FFFF00');
        embed.setAuthor('ChronoOne', 'https://imgur.com/M2uFwtY.png');

        functions.get_commands().forEach(command => {
            embed.addField(`⠀`, `**${command["name"]}**: ${command["description"]}`);
        });

        webHook.send('', {
            username: 'ChronoOne',
            avatarURL: 'https://imgur.com/M2uFwtY.png',
            embeds: [embed],
        });
    }

}