const EventEmitter = require("events");
const dbSchedule = require("./database_ops/schedule");
const guildId = require("./database_ops/guildId");
const giDB = new guildId.guildId();

class ScheduleVerify extends EventEmitter {
  verify(verifyTime, hour) {
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
          var schedulesToNotify = [];
          var days = [1, 2, 3, 5, 8, 13, 21];
          var today = new Date();
          if (user[1].schedules !== undefined) {
            Object.entries(user[1].schedules).forEach((schedule) => {
              var dateVerify = new Date();
              let deadLine = new Date(schedule[1].dead_line);
              for (let day of days) {
                dateVerify.setDate(today.getDate() + Number(day));
                // console.log(
                //   "DATE VERIFY: " +
                //     dateVerify.getDate() +
                //     " " +
                //     dateVerify.getMonth() +
                //     "\n DEADLINE: " +
                //     deadLine.getDate() +
                //     " " +
                //     deadLine.getMonth()
                // );

                if (
                  deadLine.getDate() === dateVerify.getDate() &&
                  deadLine.getMonth() === dateVerify.getMonth()
                ) {
                  schedulesToNotify.push(schedule);
                }
              }
            });
            console.log(schedulesToNotify);
            if (schedulesToNotify.length > 0) {
              this.emit(
                "notify",
                guildContents[0],
                user[0],
                schedulesToNotify,
                guildContents[1].notifyChannel
              );
            }
          }
        });
      });
      console.log("-------------------------------------------");
    });
  }
}

module.exports.ScheduleVerify = ScheduleVerify;
