const dbSch = require("../database_ops/schedule");
const Sch = new dbSch.Schedule();

module.exports = {
  name: "rsh",
  description: "Exclui uma tarefa com o título informado.",
  tag: "delete",
  execute(message, embed, webHook, args) {
    let title = "";

    args.forEach((element) => {
      title += element + " ";
    });
    title = title.trim();

    //TODO: Validações: título

    let schedulePath = `/${message.author.id}/schedules/${title}`;
    console.log(` >${schedulePath}`);
    Sch.getSchedule(message.guild.id, schedulePath);
    Sch.once("getSchedule", (value) => {
      if (value !== 0) {
        Sch.deleteSchedule(message.guild.id, schedulePath);
        Sch.getSchedule(message.guild.id, schedulePath);
        Sch.once("getSchedule", (postValue) => {
          if (postValue === 0) {
            embed.setTitle(`Tarefa "${title}" removida com sucesso!`);
            embed.setColor("#008000");
          } else {
            embed.setTitle(`Falha ao remover ${title}.`);
            embed.setDescription(`Tente novamente mais tarde.`);
            embed.setColor("#FF0000");
          }
          webHook.send("", {
            username: "ChronoOne",
            avatarURL: "https://imgur.com/M2uFwtY.png",
            embeds: [embed],
          });
        });
      } else {
        embed.setTitle(`A tarefa ${title} não existe.`);
        embed.setDescription(`Verifique se o título está correto.`);
        embed.setColor("#FF0000");
        webHook.send("", {
          username: "ChronoOne",
          avatarURL: "https://imgur.com/M2uFwtY.png",
          embeds: [embed],
        });
      }
    });
  },
};
