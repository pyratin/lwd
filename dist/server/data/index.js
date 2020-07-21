'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOneAndDelete = exports.findOneAndUpdate = exports.findOne = exports.find = void 0;

var find = function find() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var collectionName = arguments.length > 2 ? arguments[2] : undefined;
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return new Promise(function (resolve, reject) {
    return db.collection(collectionName).find(query, options).toArray(function (error, res) {
      if (error) {
        return reject(error);
      }

      return resolve(res);
    });
  });
};

exports.find = find;

var findOne = function findOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0
  };
  var collectionName = arguments.length > 2 ? arguments[2] : undefined;
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return new Promise(function (resolve, reject) {
    return db.collection(collectionName).findOne(query, options, function (error, res) {
      if (error) {
        return reject(error);
      }

      return resolve(res);
    });
  });
};

exports.findOne = findOne;

var findOneAndUpdate = function findOneAndUpdate(filter, update, options, collectionName, db) {
  return new Promise(function (resolve, reject) {
    return db.collection(collectionName).findOneAndUpdate(filter, update, options, function (error, _ref) {
      var res = _ref.value;

      if (error) {
        return reject(error);
      }

      return resolve(res);
    });
  });
};

exports.findOneAndUpdate = findOneAndUpdate;

var findOneAndDelete = function findOneAndDelete(filter, options, collectionName, db) {
  return new Promise(function (resolve, reject) {
    return db.collection(collectionName).findOneAndDelete(filter, options, function (error, _ref2) {
      var res = _ref2.value;

      if (error) {
        return reject(error);
      }

      return resolve(res);
    });
  });
};

exports.findOneAndDelete = findOneAndDelete;
//# sourceMappingURL=index.js.map