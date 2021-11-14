const firebase = require("firebase/app");
const admin = require("firebase-admin");

require("firebase/database");

module.exports = {
  createDatabase() {
    if (!admin.apps.length) {
      var serviceAccount = require("../chronogram-d91a6-firebase-adminsdk-vumj1-9ea2e0f725.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://chronogram-d91a6-default-rtdb.firebaseio.com",
        databaseAuthVariableOverride: {
          uid: "%5C9h*R^0n$!o¨&1",
        },
      });
    }

    var database = admin.database();
    return database;
  },
};
