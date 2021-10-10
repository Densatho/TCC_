const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const scheduleVerify = require("./scheduleVerify");
const sv = new scheduleVerify.ScheduleVerify();
const dbPrefix = require("./database_ops/prefix");
const Prefix = new dbPrefix.Prefix();
const verifyTime = 3600000;

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
      message.channel.fetchWebhooks().then((hooks) => {
        hooks.forEach((element) => {
          if (element.name === "ChronoOne");
          element.delete("End of execution.");
        });
      });
    }
  });
});

sv.on("verify", (notify) => {
  if (notify) {
    console.log("> Notifying users");
    sv.scheduleList();
  } else {
    console.log("> waiting to notify users");
  }
});

sv.on("notify", (guildId, userId, schedule) => {
  let guild = client.guilds.cache.get(guildId);
  let geralChannel = guild.channels.cache.find(
    (channel) => channel.name === "geral"
  );
  geralChannel.send(
    `<@${userId}> você tem a tarefa "${schedule[0]}" para amanhã\n${schedule[1].description}`
  );
});

sv.verify(verifyTime);

client.login("ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE");
