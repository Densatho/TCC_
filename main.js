const Discord = require('discord.js');

const client = new Discord.Client();
const embed = new Discord.MessageEmbed()
const prefix = '-c '
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('ChronoOne is ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (client.commands.has(command)) {
        message.channel.createWebhook('ChoronoOne', reason = "Send message").then(webHook => {
            console.log(`> command accepted is ${command}`)
            client.commands.get(command).execute(message, embed, webHook, args);
        })
    }

    message.channel.fetchWebhooks().then(hooks => {
        hooks.forEach(element => {
            if (element.name === 'ChoronoOne')
                element.delete('End execution.')
        });
    })

})

client.login('ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE');