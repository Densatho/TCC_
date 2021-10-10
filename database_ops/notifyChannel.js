const database = require("../lib/database");
const folder = require("./folderDB");
const EventEmitter = require("events");

class NotifyChannel extends EventEmitter {
  createNotifyChannel(guildId, channelId) {
    try {
      database
        .createDatabase()
        .ref(folder.value + guildId)
        .set({
          notifyChannel: channelId,
        });
      this.emit("createNotifyChannel", true);
      console.log(`> Create notify channel sucess`);
    } catch (error) {
      this.emit("createNotifyChannel", false);
      console.log(`> Create notify channel failed`);
    }
  }
  updateNotifyChannel(guildId, channelId) {
    let confirmation = false;
    try {
      let databaseRef = database.createDatabase().ref(folder.value + guildId);
      let updates = {};

      updates["/notifyChannel"] = channelId;
      databaseRef.update(updates);
      confirmation = true;
      console.log(`      > Update notify channel sucess`);
    } catch (error) {
      console.log(`      > Update notify channel failed`);
    }
    this.emit("updatePrefix", confirmation);
  }
}

module.exports = NotifyChannel;
