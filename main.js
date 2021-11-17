const functions = require("./functions.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const scheduleVerify = require("./scheduleVerify");
const sv = new scheduleVerify.ScheduleVerify();
const dbPrefix = require("./database_ops/prefix");
const Prefix = new dbPrefix.Prefix();
const verifyTime = 10000; //3600000;
const NotifyHour = 19;
client.commands = new Discord.Collection();

functions.get_commands().forEach((element) => {
  client.commands.set(element.name, element.command);
});

client.once("ready", () => {
  console.log("ChronoOne is ready!");
});

client.on("message", (message) => {
  try {
    Prefix.getPrefix(message);
  } catch (error) {
    if (!message.author.bot) {
      message.channel.send("não aceitamos comandos no privado.");
    }
  }

  Prefix.once("getPrefix", (prefix) => {
    // console.log(`> ${message.guild.name}'s prefix: ${prefix}`);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // resgata apenas o conteúdo da mensagem sem o prefixo
    // e armazena todas as palavras em uma lista
    const args = message.content.slice(prefix.length).split(/ +/);

    // pega a primeira palavra após o prefixo, ou seja o comando
    const command = args.shift();

    // verifica se o comando existe dentro da lista de comandos
    if (client.commands.has(command)) {
      // Criando menssagem embuida
      const embed = new Discord.MessageEmbed();

      // criando webhook no canal para se enviar a mensagem
      message.channel
        .createWebhook("ChronoOne", (reason = "Send message"))
        .then((webHook) => {
          console.log(`   > ${command} command accepted`);
          // Executa o comando e envia a variável message para que
          // o comando possa responder o comando do usuário corretamente
          client.commands.get(command).execute(message, embed, webHook, args);
        });

      // removendo webhook do canal
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
  if (notifyChannel) {
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
    notifyChannel.fetchWebhooks().then((hooks) => {
      hooks.forEach((element) => {
        if (element.name === "ChronoOne");
        element.delete("End of execution.");
      });
    });
  }

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
