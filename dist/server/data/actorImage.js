'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actorImagesByActorIdRemove = exports.actorImageRemove = exports.actorImageCreate = exports.actorImageFindOne = exports.actorImagesFind = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mongodb = require("mongodb");

var _index = require("./index");

var actorImageCollectionName = 'actorImages';

var actorImagesFind = function actorImagesFind(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.find)(query, options, actorImageCollectionName, db);
};

exports.actorImagesFind = actorImagesFind;

var actorImageFindOne = function actorImageFindOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {}
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOne)(query, options, actorImageCollectionName, db);
};

exports.actorImageFindOne = actorImageFindOne;

var actorImageCreate = function actorImageCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, actorImageCollectionName, db);
};

exports.actorImageCreate = actorImageCreate;

var actorImageRemove = function actorImageRemove(filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    returnOriginal: true
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOneAndDelete)(filter, options, actorImageCollectionName, db);
};

exports.actorImageRemove = actorImageRemove;

var actorImagesByActorIdRemove = function actorImagesByActorIdRemove(actorId, db) {
  return actorImagesFind({
    _actorId: new _mongodb.ObjectID(actorId)
  }, {
    projection: {
      _id: 1
    },
    sort: {},
    skip: 0,
    limit: 0
  }, db).then(function (actorImages) {
    return actorImages.reduce(function (memo, _ref) {
      var actorImageId = _ref._id;
      return memo.then(function (res) {
        return actorImageRemove({
          _id: new _mongodb.ObjectID(actorImageId)
        }, undefined, db).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      });
    }, Promise.resolve([]));
  });
};

exports.actorImagesByActorIdRemove = actorImagesByActorIdRemove;
//# sourceMappingURL=actorImage.js.map