const { value } = require("../database_ops/folderDB");
const dbSch = require("../database_ops/schedule");
const Sch = new dbSch.Schedule();

module.exports = {
  name: "lsh",
  description: "Lista as Schedules do usuário",
  tag: "list",
  execute(message, embed, webHook, args) {
    Sch.getUserSchedules(message.guild.id, message.author.id);
    Sch.once("getUserSchedules", (values) => {
      console.log(values);
      if (values === 0) {
        embed.setTitle(`${message.author.username} não possui tarefas.`);
        embed.setColor("#FF0000");
        webHook.send("", {
          username: "ChronoOne",
          avatarURL: "https://imgur.com/M2uFwtY.png",
          embeds: [embed],
        });
      } else {
        embed.setTitle(`Exibindo as tarefas para ${message.author.username}:`);
        console.log(values);
        Object.entries(values).forEach((value) => {
          embed.addField(value, value.description);
        });
        webHook.send("", {
          username: "ChronoOne",
          avatarURL: "https://imgur.com/M2uFwtY.png",
          embeds: [embed],
        });
      }
    });
  },
};
