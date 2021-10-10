const { value } = require("../database_ops/folderDB");
const dbSch = require("../database_ops/schedule");
const Sch = new dbSch.Schedule();

module.exports = {
  name: "csh",
  description: "Cria uma nova tarefa composta de Título, descrição e prazo.",
  tag: "cronograma",
  execute(message, embed, webHook, args) {
    let sb = "";

    args.forEach((element) => {
      sb += element + " ";
    });
    sb = sb.substr().split(",");

    //TODO: Validações: deadline isnumber, quantidade de parametros, dia/mes/hora
    for (let i = 0; i < sb.length; i++) {
      sb[i] = sb[i].trim();
    }

    let [title, description, deadline] = sb;

    let dateMS = Date.now();
    let deadlineDate = new Date(Date.now());

    deadlineDate = deadlineDate.setDate(
      deadlineDate.getDate() + Number(deadline)
    );

    let schedulePath = `/${message.author.id}/schedules/${title}`;

    data = {
      creation_date: dateMS,
      description: description,
      dead_line: deadlineDate,
    };
    console.log(data);
    Sch.createSchedule(message.guild.id, schedulePath, data);

    embed.setTitle(`Tarefa "${title}" agendada com sucesso!`);
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
