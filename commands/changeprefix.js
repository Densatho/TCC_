const prefix = require("../database_ops/prefix");

module.exports = {
  name: "changeprefix",
  description: "This command change a prefix in server.",
  tag: "control",
  execute(message, embed, webHook, args) {
    serverPrefix = prefix.getPrefix(message.guild);
    msg = message.content;
    newPrefix = message.substr(serverPrefix.length + this.name.length + 1);
    newPrefix += " ";
    prefix.updatePrefix(message.guild, newPrefix);
    console.log("> Created database");
    embed.setTitle("Pong");
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
