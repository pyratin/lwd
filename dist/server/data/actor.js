'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actorRemove = exports.actorCreate = exports.actorsFind = void 0;

var _mongodb = require("mongodb");

var _index = require("./index");

var actorCollectionName = 'actors';

var actorsFind = function actorsFind(query, options, db) {
  return (0, _index.find)(query, options, actorCollectionName, db);
};

exports.actorsFind = actorsFind;

var actorCreate = function actorCreate(actor, db) {
  return (0, _index.findOneAndUpdate)({
    _id: new _mongodb.ObjectID()
  }, {
    $set: actor
  }, {
    upsert: true,
    returnOriginal: false
  }, actorCollectionName, db);
};

exports.actorCreate = actorCreate;

var actorRemove = function actorRemove(actorId, db) {
  return (0, _index.findOneAndDelete)({
    _id: new _mongodb.ObjectID(actorId)
  }, {
    returnOriginal: true
  }, actorCollectionName, db);
};

exports.actorRemove = actorRemove;
//# sourceMappingURL=actor.js.map