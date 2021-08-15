const database_setup = require("../database_ops/database_setup");

module.exports = {
  name: "ping",
  description: "This is a ping command.",
  tag: "4fun",
  execute(message, embed, webHook, args) {
    database_setup.databaseSetup(message.guild);
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
