const database = require("../lib/database");
const folder = require("./folderDB");
const prefix = require("./prefix");

module.exports = {
  databaseSetup(serverId) {
    prefix.createPrefix(serverId);
  },
};
