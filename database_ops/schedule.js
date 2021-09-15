const database = require("../lib/database");
const folder = require("./folderDB");

module.exports = {
  createSchedule(request) {
    database
      .createDatabase()
      .ref(folder.value + request.serverId + request.schedulePath)
      .set(request.dbData);
  },

  deleteSchedule(request) {},
};
