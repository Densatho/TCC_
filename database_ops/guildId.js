const database = require("../lib/database");
const folder = require("./folderDB");
const EventEmitter = require("events");

class guildId extends EventEmitter {
  GetAllGuilds() {
    try {
      database
        .createDatabase()
        .ref(`${folder.value}`)
        .once("value")
        .then((snapshot) => {
          try {
            let guilds = snapshot.val();
            this.emit("getAllGuilds", guilds);
          } catch (error) {
            console.log(`Erro ao acessar as guilds`);
            console.log(error);
            this.emit("getAllGuilds", 0);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports.guildId = guildId;
