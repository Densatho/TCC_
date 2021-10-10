const NotifyChannel = require("../database_ops/notifyChannel");
const dbNotifyChannel = new NotifyChannel();

module.exports = {
  name: "changeChannel",
  description: "Comando para mudar o canal de notificação",
  tag: "controle",
  execute(message, embed, webHook, args) {
    dbNotifyChannel.updateNotifyChannel(message.guild.id, message.channel.id);

    embed.setTitle(`O canal padrão foi mudado para esse canal`);
    embed.setColor("#008000");
    webHook.send("", {
      username: "ChronoOne",
      avatarURL: "https://imgur.com/M2uFwtY.png",
      embeds: [embed],
    });
  },
};
