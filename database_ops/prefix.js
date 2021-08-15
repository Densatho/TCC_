const database = require("../lib/database");
const folder = require("./folderDB");

module.exports = {
  getPrefix(serverId) {
    console.log(serverId);
    database
      .createDatabase()
      .ref(folder.value)
      .once("value")
      .then((snapshot) => {
        this.prefix = snapshot.val()[serverId].prefix;
        console.log(this.prefix);
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
  prefix: "-c ",
  test: true,
};
