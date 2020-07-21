'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movieCreate = void 0;

var _mongodb = require("mongodb");

var _index = require("./index");

var movieCollectionName = 'movies';

var movieCreate = function movieCreate(movie, db) {
  return (0, _index.findOneAndUpdate)({
    _id: new _mongodb.ObjectID()
  }, {
    $set: movie
  }, {
    upsert: true,
    returnOriginal: false
  }, movieCollectionName, db);
};

exports.movieCreate = movieCreate;
//# sourceMappingURL=movie.js.map