import database from "../lib/database";
import folder from "./folderDB";
import { createPrefix } from "./prefix";

module.exports = {
  databaseSetup(serverId) {
    database
      .database()
      .ref(folder + "/" + serverId)
      .set({
        prefix: createPrefix(serverId),
      });
  },
};
