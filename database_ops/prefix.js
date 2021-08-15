const database = require("../lib/database");
const folder = require("./folderDB");

module.exports = {
  getPrefix(serverId) {
    var value = 0;
    let prefixRef = database.createDatabase().ref(folder.path + serverId);
    prefixRef.on("prefix", (snapshot) => {
      value = snapshot.val();
    });
    return value;
  },
  updatePrefix(serverId, prefix) {
    var updates = {};
    updates[folder.path + serverId + "/prefix"] = prefix;
    database.createDatabase().ref().update(updates);
  },
  createPrefix(serverId) {
    var prefix = "-c";
    database
      .createDatabase()
      .ref(folder.path + serverId)
      .set({
        prefix: prefix,
      });
    console.log(`> Create Prefix is a sucess`);
  },
};
