const EventEmitter = require("events");
const dbSchedule = require("./database_ops/schedule");

class ScheduleVerify extends EventEmitter {
  verify() {
    let hour = 13;
    let notifyTime = false;
    setInterval(() => {
      console.log("> verify: setInterval()");
      let dateNow = new Date(Date.now());
      if (dateNow.getHours() == hour) {
        notifyTime = true;
      }
      this.emit("verify", notifyTime);
    }, 6000);
  }
  scheduleList() {}
}

module.exports.ScheduleVerify = ScheduleVerify;
