const EventEmitter = require("events");
const dbSchedule = require("./database_ops/schedule");
const guildId = require("./database_ops/guildId");
const giDB = new guildId.guildId();

class ScheduleVerify extends EventEmitter {
  verify() {
    let hour = 17;
    let notifyTime = false;
    setInterval(() => {
      console.log("> verify: setInterval()");
      let dateNow = new Date(Date.now());
      if (dateNow.getHours() == hour) {
        notifyTime = true;
      }
      this.emit("verify", notifyTime);
    }, 1000);
  }
  scheduleList() {
    console.log("message: ", message);
    giDB.GetAllGuilds();
    giDB.once("getAllGuilds", (guilds) => {
      Object.entries(guilds).forEach((guildsContent) => {
        Object.entries(guildsContent[1]).forEach((users) => {
          if (users[1].schedules !== undefined) {
            Object.entries(users[1].schedules).forEach((schedule) => {
              // console.log(schedule[1]);
            });
          }
        });
      });
      console.log("-------------------------------------------");
    });
  }
}

module.exports.ScheduleVerify = ScheduleVerify;
