const database = require("../lib/database");
const folder = require("./folderDB");
const EventEmitter = require("events");

class Schedule extends EventEmitter {
  createSchedule(guildId, schedulePath, data) {
    let confirmation = true;
    try {
      database
        .createDatabase()
        .ref(folder.value + guildId + schedulePath)
        .set(data);
    } catch (error) {
      confirmation = false;
    }
    this.emit("createSchedule", confirmation);
  }

  deleteSchedule() {}
}

module.exports.Schedule = Schedule;
