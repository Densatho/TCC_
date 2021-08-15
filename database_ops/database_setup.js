const database = require("../lib/database");
const prefix = require("./prefix");

module.exports = {
  databaseSetup(serverId) {
    prefix.createPrefix(serverId);
  },
};
