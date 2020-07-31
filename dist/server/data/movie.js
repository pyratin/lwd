'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movieCreate = void 0;

var _index = require("./index");

var movieCollectionName = 'movies';

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