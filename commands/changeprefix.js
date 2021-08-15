const prefix = require("../database_ops/prefix");

module.exports = {
  name: "changeprefix",
  description: "This command change a prefix in server.",
  tag: "control",
  execute(message, embed, webHook, args) {
    serverPrefix = prefix.getPrefix(message.guild.id);
    msg = message.content;
    newPrefix = msg.substr(serverPrefix.length + this.name.length + 3);
    newPrefix += " ";
    prefix.updatePrefix(message.guild, newPrefix);
    console.log("> Update prefix");
    embed.setTitle(`Prefix is changed to ${newPrefix}`);
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
