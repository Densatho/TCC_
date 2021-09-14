const prefixOps = require("../database_ops/prefix");
const { createDatabase } = require("../lib/database");

module.exports = {
  name: "csh",
  description: "Create a new Schedule",
  tag: "create",
  execute(message, embed, webHook, args) {
      let prefix = prefixOps.getPrefix();

      let messageUnusedPart = prefix.length + "csh".length + 1;

      let mensagemSeparada = message.substr().split(',')

      //[0]                 [1]                       [2]
      //-f csh Comprar Pão, comprar 6 pães na padaria, 7 days

      let title = mensagemSeparada[0].substr(messageUnusedPart);
      console.log(`[csh] title: ${title}`);
      let description = mensagemSeparada[1];
      console.log(`[csh] title: ${description}`);
      let deadline = mensagemSeparada[2];
      console.log(`[csh] title: ${deadline}`);

      let userSchedules = `/${request.userId}/schedules`;
      let databaseRef = createDatabase().ref(folder.value + serverId + userSchedules);
      console.log(databaseRef);
      var date = new Date();
  
      // databaseRef.set({
      //   creation_date: date.getDate(),
      //   description: description,
      //   due_date: date.setDate(date.getDate() + deadline),
      //   name: title
      // })

      embed.setTitle(`Tarefa ${title} agendada com sucesso!`);
      embed.setColor("#008000");
      webHook.send("", {
        username: "ChronoOne",
        avatarURL: "https://imgur.com/M2uFwtY.png",
        embeds: [embed],
      });
    }
};
