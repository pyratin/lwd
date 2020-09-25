'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genresRemove = exports.genreRemove = exports.genreCreate = exports.genreCountDocuments = exports.genreFindOne = exports.genresFind = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _index = require("./index");

var _set = require("./set");

var genreCollectionName = 'genres';

var genresFind = function genresFind(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.find)(query, options, genreCollectionName, db);
};

exports.genresFind = genresFind;

var genreFindOne = function genreFindOne(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {}
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOne)(query, options, genreCollectionName, db);
};

exports.genreFindOne = genreFindOne;

var genreCountDocuments = function genreCountDocuments(query, options, db) {
  return (0, _index.countDocuments)(query, options, genreCollectionName, db);
};

exports.genreCountDocuments = genreCountDocuments;

var genreCreate = function genreCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, genreCollectionName, db);
};

exports.genreCreate = genreCreate;

var genreRemove = function genreRemove(filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    returnOriginal: true
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOneAndDelete)(filter, options, genreCollectionName, db).then( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(genre) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _set.setsByGenreIdRemove)(genre._id, db);

            case 2:
              return _context.abrupt("return", genre);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.genreRemove = genreRemove;

var genresRemove = function genresRemove(db) {
  return genresFind(undefined, undefined, db).then(function (genres) {
    return genres.reduce(function (memo, _ref2) {
      var genreId = _ref2._id;
      return memo.then(function (res) {
        return genreRemove({
          _id: new _mongodb.ObjectID(genreId)
        }, undefined, db).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      });
    }, Promise.resolve([]));
  });
};

exports.genresRemove = genresRemove;
//# sourceMappingURL=genre.js.map