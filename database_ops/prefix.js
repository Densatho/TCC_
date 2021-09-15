const database = require("../lib/database");
const folder = require("./folderDB");
const EventEmitter = require("events");

class Prefix extends EventEmitter {
  /**
   * CreatePrefix cria o servidor no banco de dados com um prefix padrão
   * que é "-c"
   * @param {*Int} guildId
   */
  createPrefix(guildId) {
    try {
      var prefix = "-c ";
      database
        .createDatabase()
        .ref(folder.value + guildId)
        .set({
          prefix: prefix,
        });
      this.emit("createPrefix", true);
      console.log(`> Create Prefix sucess`);
    } catch (error) {
      this.emit("createPrefix", false);
      console.log(`> Create Prefix failed`);
    }
  }

  /**
   * updatePrefix utiliza o guildId para acessar o banco de dados
   * e conseguir mudar para o prefix
   * @param {*int} guildId
   * @param {*String} prefix
   */
  updatePrefix(guildId, prefix) {
    let confirmation = false;
    try {
      let databaseRef = database.createDatabase().ref(folder.value + guildId);
      let updates = {};

      updates["/prefix"] = prefix;
      databaseRef.update(updates);
      confirmation = true;
      console.log(`      > Update Prefix sucess`);
    } catch (error) {
      console.log(`      > Update Prefix failed`);
    }
    this.emit("updatePrefix", confirmation);
  }

  /**
   * getPrefix acessa o banco de dados utilizando o guildId para buscar
   * o prefixo do servidor em questão, emitindo um evendo ao encontrar,
   * se o servidor não for encontrado é feito a criação do mesmo
   * usando o createPrefix
   * @param {*int} guildId
   */
  getPrefix(guildId) {
    database
      .createDatabase()
      .ref(folder.value)
      .once("value")
      .then((snapshot) => {
        try {
          let prefix = snapshot.val()[guildId].prefix;
          this.emit("getPrefix", prefix);
        } catch (error) {
          console.log(`> server is not registered...`);
          console.log(`> registering server...`);
          this.createPrefix(guildId);
          this.getPrefix(guildId);
        }
      });
  }
}

module.exports.Prefix = Prefix;
