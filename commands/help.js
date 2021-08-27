const functions = require("../functions.js");

module.exports = {
  name: "help",
  description:
    "Comando para mostrar todos os comandos ou para mostra a descrição de algum comando",
  tag: "controle",
  execute(message, embed, webHook, args) {
    const color = "#FFFF00";
    let title = "Help";
    let description;
    let commandName = args.shift();
    let commandConfirm = false;

    description = "Mostrando os comandos do bot\n";
    description += "Utilize **help nomeDoComando**\n";
    description += "para ver a descrição de algum comando\n ";
    if (commandName) {
      functions.get_commands().forEach((command) => {
        if (command.name === commandName) {
          description = command.description;
          title += ` - ${commandName}`;
          commandConfirm = true;
        }
      });
    }

    if (!commandConfirm) {
      value_control = "";
      value_4fun = "";
      functions.get_commands().forEach((command) => {
        if (command.tag === "controle") {
          value_control += `\`${command.name}\`, `;
        } else if (command.tag === "4fun") {
          value_4fun += `\`${command.name}\`, `;
        }
      });

      value_control = value_control.substr(0, value_control.length - 2);
      value_4fun = value_4fun.substr(0, value_4fun.length - 2);

      console.log(`Help > value_control: ${value_control}`);
      console.log(`Help > value_4fun: ${value_4fun}`);

      embed.addField(`Gerenciamento de bot:`, value_control);
      embed.addField(`Miscelânia:`, value_4fun);
    }

    embed.setTitle(title);
    embed.setColor(color);
    embed.setDescription(description);
    embed.setThumbnail("https://imgur.com/M2uFwtY.png");

    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
