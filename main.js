const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const scheduleVerify = require("./scheduleVerify");
const sv = new scheduleVerify.ScheduleVerify();
const dbPrefix = require("./database_ops/prefix");
const Prefix = new dbPrefix.Prefix();

client.commands = new Discord.Collection();

functions.get_commands().forEach((element) => {
  client.commands.set(element.name, element.command);
});

client.once("ready", () => {
  console.log("ChronoOne is ready!");
});

client.on("message", (message) => {
  Prefix.getPrefix(message.guild.id);

  Prefix.once("getPrefix", (prefix) => {
    console.log(`> ${message.guild.name}'s prefix: ${prefix}`);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (client.commands.has(command)) {
      const embed = new Discord.MessageEmbed();
      message.channel
        .createWebhook("ChronoOne", (reason = "Send message"))
        .then((webHook) => {
          console.log(`   > ${command} command accepted`);
          client.commands.get(command).execute(message, embed, webHook, args);
        });
    }

    message.channel.fetchWebhooks().then((hooks) => {
      hooks.forEach((element) => {
        if (element.name === "ChronoOne");
        element.delete("End of execution.");
      });
    });
  });
});

client.login("ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE");

sv.on("verify", (notifyTime) => {
  if (notifyTime) {
    console.log("> Notifying users");
  } else {
    console.log("> waiting to notify users");
  }
});

sv.verify();
