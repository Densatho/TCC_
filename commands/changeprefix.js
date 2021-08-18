const prefix = require("../database_ops/prefix");

module.exports = {
  name: "changeprefix",
  description: "Comando para se mudar o prefixo",
  tag: "controle",
  execute(message, embed, webHook, args) {
    function changePrefix(request) {
      let message = request.message;
      let serverPrefix = request.prefix;
      let msg = message.content;
      let embed = request.embed;
      let webHook = request.webHook;

      let newPrefix = msg.substr(
        serverPrefix.length + "changeprefix".length + 1
      );
      newPrefix += " ";

      prefix.updatePrefix(message.guild.id, newPrefix);

      embed.setTitle(`Prefixo foi mudado para ${newPrefix}`);
      embed.setColor("#008000");
      webHook.send("", {
        username: "ChronoOne",
        avatarURL: "https://imgur.com/M2uFwtY.png",
        embeds: [embed],
      });
    }

    prefixRequest = {
      guildId: message.guild.id,
      message: message,
      messageResponse: changePrefix,
      embed: embed,
      webHook: webHook,
    };

    prefix.getPrefix(prefixRequest);
  },
};
