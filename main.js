const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-c ' 

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('ChronoOne is ready!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    hooks = message.channel.fetchWebhooks().then(hooks => {

        if (hooks.size === 0){
            message.channel.createWebhook('ChoronoOne', reason = "need a cool new Webhook")
            console.log(`> create a new WebHook`)
        } else {
            hooks.forEach(valor => {
                console.log(`> valor = ${valor.name}`)
                if (valor.name === 'ChoronoOne'){
                    console.log(`> ChoronoOne is already created`)
                } else {
                    message.channel.createWebhook('ChoronoOne', reason = "need a cool new Webhook")
                    console.log(`> create a new WebHook`)
                }
            })
        }

    })

    if(client.commands.has(command)){
        console.log(`> command accepted is ${command}`)
        client.commands.get(command).execute(message, args);
        }
    });


client.login('ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE');


