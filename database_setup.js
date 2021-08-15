import database from "./lib/database";
import folder from "./database_ops/folderDB";
import { createPrefix } from "./prefix";

databaseSetup(serverId)
{
    database.database().ref(folder+'/'+serverId).set({
        prefix: createPrefix(serverId)
    })  
}

export default databaseSetup;



