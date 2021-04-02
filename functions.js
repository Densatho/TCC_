const fs = require('fs');

module.exports = {
    get_commands(){
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        commands = [];
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);

            commands.push({
                name: command.name,
                description: command.description,
                tag: command.tag,
                command: command
            });
        }
        return commands;
    }
}