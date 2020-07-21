'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actorImageRemove = exports.actorImageCreate = exports.actorImageFindOne = exports.actorImagesFind = void 0;

var _mongodb = require("mongodb");

var _index = require("./index");

var actorImageCollectionName = 'actorImages';

var actorImagesFind = function actorImagesFind(query, options, db) {
  return (0, _index.find)(query, options, actorImageCollectionName, db);
};

exports.actorImagesFind = actorImagesFind;

var actorImageFindOne = function actorImageFindOne(query, options, db) {
  return (0, _index.findOne)(query, options, actorImageCollectionName, db);
};

exports.actorImageFindOne = actorImageFindOne;

var actorImageCreate = function actorImageCreate(actorImage, db) {
  return (0, _index.findOneAndUpdate)({
    _id: new _mongodb.ObjectID()
  }, {
    $set: actorImage
  }, {
    upsert: true,
    returnOriginal: false
  }, actorImageCollectionName, db);
};

exports.actorImageCreate = actorImageCreate;

var actorImageRemove = function actorImageRemove(actorImageId, db) {
  return (0, _index.findOneAndDelete)({
    _id: new _mongodb.ObjectID(actorImageId)
  }, {
    returnOriginal: true
  }, actorImageCollectionName, db);
};

exports.actorImageRemove = actorImageRemove;
//# sourceMappingURL=actorImage.js.map