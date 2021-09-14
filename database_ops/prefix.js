const database = require("../lib/database");
const folder = require("./folderDB");

module.exports = {
  /**
   * getPrefix acessa o banco de dados usando o id do servidor do discord
   * pega o prefix e adiciona em request.prefix para poder utilizado na
   * função padrão vindo em request, a request.messageResponse
   * fazendo assim a execução da função com o devido prefix do servidor
   * @param {*object} request
   * @returns UNDEFINED
   */
  getPrefix(request) {
    console.log(request.guildId);
    database
      .createDatabase()
      .ref(folder.value)
      .once("value")
      .then((snapshot) => {
        let prefix;
        try {
          prefix = snapshot.val()[request.guildId].prefix;
          request["prefix"] = prefix;
          request.messageResponse(request);
          console.log(prefix);
        } catch (error) {
          console.log(`> server is not registered...`);
          console.log(`> registering server...`);
          this.createPrefix(request.guildId);
          this.getPrefix(request);
        }
      });
    return this.prefix;
  },
  updatePrefix(serverId, prefix) {
    let databaseRef = database.createDatabase().ref(folder.value + serverId);
    let updates = {};

    updates["/prefix"] = prefix;
    databaseRef.update(updates);
  },
  createPrefix(serverId) {
    var prefix = "-c ";
    database
      .createDatabase()
      .ref(folder.value + serverId)
      .set({
        prefix: prefix,
      });
    console.log(`> Create Prefix is a sucess`);
  },
};
