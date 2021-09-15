const { clearConfigCache } = require("prettier");
const sch = require("../database_ops/schedule");

module.exports = {
  name: "csh",
  description: "Cria uma nova tarefa composta de Título, descrição e prazo.",
  tag: "create",
  execute(message, embed, webHook, args) {
    let sb = "";

    args.forEach((element) => {
      sb += element + " ";
    });
    sb = sb.substr().split(", ");

    //TODO: Validações: deadline isnumber, quantidade de parametros, dia/mes/hora
    let [title, description, deadline] = sb;

    let dateMS = Date.now();
    let deadlineDate = new Date(Date.now());

    deadlineDate = deadlineDate.setDate(
      deadlineDate.getDate() + Number(deadline)
    );

    let schedulePath = `/${message.author.id}/schedules/${dateMS}`;

    console.log(deadlineDate);

    request = {
      serverId: message.guild.id,
      schedulePath: schedulePath,
      dbData: {
        name: title,
        creation_date: dateMS,
        description: description,
        dead_line: deadlineDate,
      },
    };

    sch.createSchedule(request);

    embed.setTitle(`Tarefa ${title} agendada com sucesso!`);
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
