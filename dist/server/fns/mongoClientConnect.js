'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongodb = require("mongodb");

var _default = function _default(mongoUri) {
  return new Promise(function (resolve, reject) {
    var dbName = mongoUri.split(/\//).slice(-1)[0];
    return new _mongodb.MongoClient.connect(mongoUri, {
      useUnifiedTopology: true
    }, function (error, client) {
      if (error) {
        return reject(error);
      } // eslint-disable-next-line no-console


      console.log("\n              mongoClientConnect: ".concat(mongoUri, "\n            ").trim());
      return resolve(client.db(dbName));
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=mongoClientConnect.js.map