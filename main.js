const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-c ";
<<<<<<< HEAD
const databaseSetup = require("./database_ops/database_setup");

=======
const dbSetup = require("./database_ops/database_setup.js");
//
>>>>>>> 2e2ae5fa4c4defc916dad284341d64a63a628ba1
client.commands = new Discord.Collection();

functions.get_commands().forEach((element) => {
  client.commands.set(element.name, element.command);
});

client.once("ready", () => {
  console.log("ChronoOne is ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift();

  if (client.commands.has(command)) {
    const embed = new Discord.MessageEmbed();
    message.channel
      .createWebhook("ChronoOne", (reason = "Send message"))
      .then((webHook) => {
        console.log(`> ${command} command accepted`);
        client.commands.get(command).execute(message, embed, webHook, args);
      });
  }

  client.on("guildCreate", (guild) => {
<<<<<<< HEAD
    databaseSetup(guild.id);
=======
    dbSetup(guild.id);
>>>>>>> 2e2ae5fa4c4defc916dad284341d64a63a628ba1
  });

  message.channel.fetchWebhooks().then((hooks) => {
    hooks.forEach((element) => {
      if (element.name === "ChronoOne");
      element.delete("End of execution.");
    });
  });
});

client.login("ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE");
