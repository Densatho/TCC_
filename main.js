const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const scheduleVerify = require("./scheduleVerify");
const sv = new scheduleVerify.ScheduleVerify();
const dbPrefix = require("./database_ops/prefix");
const Prefix = new dbPrefix.Prefix();
const verifyTime = 10000; //3600000;
const NotifyHour = 22;
client.commands = new Discord.Collection();

functions.get_commands().forEach((element) => {
  client.commands.set(element.name, element.command);
});

client.once("ready", () => {
  console.log("ChronoOne is ready!");
});

client.on("message", (message) => {
  Prefix.getPrefix(message);

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

sv.on("notify", (guildId, userId, scheduleList, channelId) => {
  const embed = new Discord.MessageEmbed();
  let guild = client.guilds.cache.get(guildId);
  let notifyChannel = guild.channels.cache.find(
    (channel) => channel.id === channelId
  );
  notifyChannel.send(`<@${userId}>`);
  notifyChannel
    .createWebhook("ChronoOne", (reason = "Send message"))
    .then((webHook) => {
      embed.setTitle(`Suas seguintes tarefas estão próximas:`);
      scheduleList.forEach((value) => {
        embed.addField(
          `Tarefa: ${value[0]}`,
          "\n" +
            //`Descrição: ${value[1].description}` +
            `Prazo: ${
              new Date(value[1].dead_line).getDate() - new Date().getDate()
            } dias.\n\n`
        );
      });
      webHook.send("", {
        username: "ChronoOne",
        avatarURL: "https://imgur.com/M2uFwtY.png",
        embeds: [embed],
      });
    });
  message.channel.fetchWebhooks().then((hooks) => {
    hooks.forEach((element) => {
      if (element.name === "ChronoOne");
      element.delete("End of execution.");
    });
  });

  // console.log(schedule, channelId);
  // let intervalMessage = `daqui ${interval} dias`;
  // if (interval === 1) {
  //   intervalMessage = "amanhã";
  // }
  // notifyChannel.send(
  //   `, sua tarefa "${schedule[0]}" está agendada para ${intervalMessage}.\nDescrição:${schedule[1].description}`
  // );
});

sv.verify(verifyTime, NotifyHour);

client.login("ODIyMjE0ODc4MDcyNjY4MTgw.YFPBRg.ECaLQuM61bWEeX-eb0AAz8y5CxE");
