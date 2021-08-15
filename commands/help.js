const functions = require("../functions.js");

module.exports = {
  name: "help",
  description: "This command show all commands.",
  tag: "control",
  execute(message, embed, webHook, args) {
    embed.setTitle("Help");
    embed.setColor("#FFFF00");
    description = "Mostrando os comandos do bot\n⠀";
    embed.setDescription(description);

    value_control = "";
    value_4fun = "";
    functions.get_commands().forEach((command) => {
      if (command.tag === "control") {
        value_control += `\`${command.name}\`, `;
      } else if (command.tag === "4fun") {
        value_4fun += `\`${command.name}\`, `;
      }
    });

    value_control = value_control.substr(0, value_control.length - 2);
    value_4fun = value_4fun.substr(0, value_4fun.length - 2);

    console.log(`Help > value_control: ${value_control}`);
    console.log(`Help > value_4fun: ${value_4fun}`);

    embed.addField(`Gerenciamneto de bot:`, value_control);
    embed.addField(`Miscelânia:`, value_4fun);
    embed.setThumbnail("https://imgur.com/M2uFwtY.png");

    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
