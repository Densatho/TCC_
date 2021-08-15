<<<<<<< HEAD
const database = require("../lib/database");
const prefix = require("./prefix");

module.exports = {
  databaseSetup(serverId) {
    prefix.createPrefix(serverId);
=======
import database from "../lib/database";
import folder from "./folderDB";
import { createPrefix } from "./prefix";
//
module.exports = {
  databaseSetup(serverId) {
    database
      .database()
      .ref(folder + "/" + serverId)
      .set({
        prefix: createPrefix(serverId),
      });
>>>>>>> 2e2ae5fa4c4defc916dad284341d64a63a628ba1
  },
};
