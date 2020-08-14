'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movieCreate = exports.movieFindOne = void 0;

var _index = require("./index");

var movieCollectionName = 'movies';

var movieFindOne = function movieFindOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {}
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOne)(query, options, movieCollectionName, db);
};

exports.movieFindOne = movieFindOne;

var movieCreate = function movieCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, movieCollectionName, db);
};

exports.movieCreate = movieCreate;
//# sourceMappingURL=movie.js.map