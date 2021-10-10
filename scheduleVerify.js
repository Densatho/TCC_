const EventEmitter = require("events");
const dbSchedule = require("./database_ops/schedule");
const guildId = require("./database_ops/guildId");
const giDB = new guildId.guildId();

class ScheduleVerify extends EventEmitter {
  verify(verifyTime) {
    let hour = 17;
    let notify = false;
    setInterval(() => {
      console.log("> verify: setInterval()");
      let dateNow = new Date(Date.now());
      if (dateNow.getHours() == hour) {
        notify = true;
      }
      this.emit("verify", notify);
    }, verifyTime);
  }
  scheduleList() {
    giDB.GetAllGuilds();
    giDB.once("getAllGuilds", (guild) => {
      Object.entries(guild).forEach((guildContents) => {
        Object.entries(guildContents[1]).forEach((user) => {
          if (user[1].schedules !== undefined) {
            Object.entries(user[1].schedules).forEach((schedule) => {
              let deadLine = new Date(schedule[1].dead_line);
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              if (deadLine.getDate() === tomorrow.getDate()) {
                this.emit(
                  "notify",
                  guildContents[0],
                  user[0],
                  schedule,
                  guildContents[1].notifyChannel
                );
              }
            });
          }
        });
      });
      console.log("-------------------------------------------");
    });
  }
}

module.exports.ScheduleVerify = ScheduleVerify;
