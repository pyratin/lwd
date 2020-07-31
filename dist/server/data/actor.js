'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actorsBySetIdRemove = exports.actorRemove = exports.actorCreate = exports.actorsFind = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mongodb = require("mongodb");

var _index = require("./index");

var _actorImage = require("./actorImage");

var actorCollectionName = 'actors';

var actorsFind = function actorsFind(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.find)(query, options, actorCollectionName, db);
};

exports.actorsFind = actorsFind;

var actorCreate = function actorCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, actorCollectionName, db);
};

exports.actorCreate = actorCreate;

var actorRemove = function actorRemove(filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    returnOriginal: true
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOneAndDelete)(filter, options, actorCollectionName, db).then(function (_ref) {
    var actorId = _ref._id;
    return (0, _actorImage.actorImagesByActorIdRemove)(actorId, db);
  });
};

exports.actorRemove = actorRemove;

var actorsBySetIdRemove = function actorsBySetIdRemove(setId, db) {
  return actorsFind({
    _setId: new _mongodb.ObjectID(setId)
  }, undefined, db).then(function (actors) {
    return actors.reduce(function (memo, _ref2) {
      var actorId = _ref2._id;
      return memo.then(function (res) {
        return actorRemove({
          _id: new _mongodb.ObjectID(actorId)
        }, undefined, db).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      });
    }, Promise.resolve([]));
  });
};

exports.actorsBySetIdRemove = actorsBySetIdRemove;
//# sourceMappingURL=actor.js.map