import database from "../lib/database";
import folder from "./folderDB";
import { createPrefix } from "./prefix";

function databaseSetup(serverId) {
  database
    .database()
    .ref(folder + "/" + serverId)
    .set({
      prefix: createPrefix(serverId),
    });
}

export default databaseSetup;
