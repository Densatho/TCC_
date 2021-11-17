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

    //Verifica existem parâmetros após o csh.
    if (sb.trim() === "") {
      this.sendEmbedError(
        embed,
        webHook,
        "",
        "Sintaxe: Preencha os parâmetros após o comando csh."
      );
      return;
    }

    sb = sb.substr().split(",");

    for (let i = 0; i < sb.length; i++) {
      sb[i] = sb[i].trim();
    }

    let [title, description, deadline] = sb;
    let errorMessage = "";

    //Validações começam aqui
    if (typeof title == "undefined" || title.trim() === "") {
      errorMessage = "O título não pode ser vazio! ";
    }

    if (typeof description == "undefined" || description.trim() === "") {
      errorMessage += "A descrição não pode ser vazia! ";
    }

    if (
      typeof deadline == "undefined" ||
      isNaN(deadline) ||
      deadline.trim() === "" ||
      Number(deadline.trim()) <= 0
    ) {
      errorMessage += "O prazo deve ser superior à 0 e deve ser um número.";
    }

    if (errorMessage != "") {
      this.sendEmbedError(embed, webHook, title, errorMessage);
      return;
    }

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

  sendEmbedError(embed, webHook, title, errorMessage) {
    if (title == "") title = "";
    else title = ` \"${title}\"`;
    embed.setTitle(`Erro no agendamento da tarefa${title}.`);
    embed.addField("Os seguintes erros ocorreram:", errorMessage);
    embed.setColor("#FF0000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
