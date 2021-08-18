const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefixDB = require("./database_ops/prefix");
//
client.commands = new Discord.Collection();

functions.get_commands().forEach((element) => {
  client.commands.set(element.name, element.command);
});

client.once("ready", () => {
  console.log("ChronoOne is ready!");
});

client.on("message", (message) => {
  prefixRequest = {
    guildId: message.guild.id,
    message: message,
    messageResponse: messageResponse,
  };

  prefixDB.getPrefix(prefixRequest);
});

client.login("ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE");

function messageResponse(request) {
  let message = request.message;
  let prefix = request.prefix;
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

  message.channel.fetchWebhooks().then((hooks) => {
    hooks.forEach((element) => {
      if (element.name === "ChronoOne");
      element.delete("End of execution.");
    });
  });
}
