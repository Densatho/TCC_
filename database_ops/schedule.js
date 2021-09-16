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

  deleteSchedule(guildId, schedulePath) {
    let confirmation = true;
    try {
      database
        .createDatabase()
        .ref(folder.value + guildId + schedulePath)
        .remove();
    } catch (error) {
      confirmation = false;
    }
    this.emit("deleteSchedule", confirmation);
  }

  getAllSchedules() {}

  getUserSchedules(guildId, schedulePath) {}

  getSchedule(guildId, schedulePath) {
    database
      .createDatabase()
      .ref(folder.value + guildId + schedulePath)
      .once("value")
      .then((snapshot) => {
        try {
          let dataCriacao = snapshot.val().creation_date;
          this.emit("getSchedule", dataCriacao);
        } catch (error) {
          console.log(`> Schedule não encontrada`);
          this.emit("getSchedule", 0);
        }
      });
  }
}

module.exports.Schedule = Schedule;
