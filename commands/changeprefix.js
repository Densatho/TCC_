const prefix = require("../database_ops/prefix");
const dbPrefix = new prefix.Prefix();

module.exports = {
  name: "changeprefix",
  description: "Comando para se mudar o prefixo",
  tag: "controle",
  execute(message, embed, webHook, args) {
    newPrefix = args.shift() + " ";

    dbPrefix.updatePrefix(message.guild.id, newPrefix);

    embed.setTitle(`Prefixo foi mudado para ${newPrefix}`);
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
