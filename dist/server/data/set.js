'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setsByGenreIdRemove = exports.setRemove = exports.setCreate = exports.setCountDocuments = exports.setFindOne = exports.setsFind = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mongodb = require("mongodb");

var _index = require("./index");

var _actor = require("./actor");

var setCollectionName = 'sets';

var setsFind = function setsFind(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.find)(query, options, setCollectionName, db);
};

exports.setsFind = setsFind;

var setFindOne = function setFindOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {}
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOne)(query, options, setCollectionName, db);
};

exports.setFindOne = setFindOne;

var setCountDocuments = function setCountDocuments(query, options, db) {
  return (0, _index.countDocuments)(query, options, setCollectionName, db);
};

exports.setCountDocuments = setCountDocuments;

var setCreate = function setCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, setCollectionName, db);
};

exports.setCreate = setCreate;

var setRemove = function setRemove(filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    returnOriginal: true
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOneAndDelete)(filter, options, setCollectionName, db).then(function (_ref) {
    var setId = _ref._id;
    return (0, _actor.actorsBySetIdRemove)(setId, db);
  });
};

exports.setRemove = setRemove;

var setsByGenreIdRemove = function setsByGenreIdRemove(genreId, db) {
  return setsFind({
    _genreId: new _mongodb.ObjectID(genreId)
  }, undefined, db).then(function (sets) {
    return sets.reduce(function (memo, _ref2) {
      var setId = _ref2._id;
      return memo.then(function (res) {
        return setRemove({
          _id: new _mongodb.ObjectID(setId)
        }, undefined, db).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      });
    }, Promise.resolve([]));
  });
};

exports.setsByGenreIdRemove = setsByGenreIdRemove;
//# sourceMappingURL=set.js.map