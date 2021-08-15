const database = require("../lib/database");
const folder = require("./folderDB");

module.exports = {
  getPrefix(serverId) {
    var value = 0;
    let prefixRef = database.createDatabase().ref(folder.value + serverId);
    return prefixRef.once("prefix");
  },
  updatePrefix(serverId, prefix) {
    var updates = {};
    updates[folder.value + serverId + "/prefix"] = prefix;
    database
      .createDatabase()
      .ref(folder.valuer + serverId)
      .set({
        prefix: prefix,
      });
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
