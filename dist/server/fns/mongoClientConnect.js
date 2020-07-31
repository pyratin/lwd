'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongodb = require("mongodb");

var _default = function _default() {
  return new Promise(function (resolve, reject) {
    var mongoUrl = process.env.MONGO_URL;
    var dbName = mongoUrl.split(/\//).slice(-1)[0];
    return new _mongodb.MongoClient.connect(mongoUrl, {
      useUnifiedTopology: true
    }, function (error, client) {
      if (error) {
        return reject(error);
      } // eslint-disable-next-line no-console


      console.log("\n              mongoClientConnect: ".concat(mongoUrl, "\n            ").trim());
      return resolve(client.db(dbName));
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=mongoClientConnect.js.map