import database from "../lib/firebase";
import folder from "./folderDB";

function getPrefix(serverId) {
  var value = 0;
  let prefixRef = database().ref(folder + serverId);
  prefixRef.on("prefix", (snapshot) => {
    value = snapshot.val();
  });
  return value;
}

export function updatePrefix(serverId, prefix) {
  var updates = {};
  updates[serverId + "/prefix"] = prefix;
  return database().ref().update(updates);
}

export function createPrefix(serverId) {
  var prefix = "-c";
  database()
    .ref(folder + serverId)
    .set({
      prefix: prefix,
    });
}

export default getPrefix;
