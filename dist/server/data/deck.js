'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deckCreate = exports.deckCountDocuments = exports.deckFindOne = exports.deckFind = void 0;

var _index = require("./index");

var deckCollectionName = 'decks';

var deckFind = function deckFind(query, options, db) {
  return (0, _index.find)(query, options, deckCollectionName, db);
};

exports.deckFind = deckFind;

var deckFindOne = function deckFindOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {}
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOne)(query, options, deckCollectionName, db);
};

exports.deckFindOne = deckFindOne;

var deckCountDocuments = function deckCountDocuments(query, options, db) {
  return (0, _index.countDocuments)(query, options, deckCollectionName, db);
};

exports.deckCountDocuments = deckCountDocuments;

var deckCreate = function deckCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, deckCollectionName, db);
};

exports.deckCreate = deckCreate;
//# sourceMappingURL=deck.js.map