import database from "../lib/firebase";
import folder from "./folderDB";

function prefixGet(serverId) {
  var value = 0;
  let prefixRef = database().ref(folder + serverId);
  prefixRef.on("prefix", (snapshot) => {
    value = snapshot.val();
  });
  return value;
}

export default prefixGet;
