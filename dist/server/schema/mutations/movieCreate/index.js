'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _movieDataBasicGet = _interopRequireDefault(require("../fns/movieDataBasicGet"));

var _charactersGet = _interopRequireDefault(require("../fns/charactersGet"));

var _segmentsGet = _interopRequireDefault(require("../fns/segmentsGet"));

var _cardsGet = _interopRequireDefault(require("../fns/cardsGet"));

var _gifGet = _interopRequireDefault(require("../fns/gifGet"));

var _movie = require("../../../data/movie");

var _movieWrite = _interopRequireDefault(require("../fns/movieWrite"));

var _movieTitleRandomGet = _interopRequireDefault(require("../fns/movieTitleRandomGet"));

var _variable = require("../../../fns/variable");

var titleGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
    var match, title;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            match = text.match(/^random:(english|hindi|tamil)$/);

            if (!match) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return (0, _movieTitleRandomGet["default"])(text.split(/:/)[1]);

          case 4:
            _context.t0 = _context.sent;
            _context.next = 8;
            break;

          case 7:
            _context.t0 = Promise.resolve(text);

          case 8:
            title = _context.t0;
            return _context.abrupt("return", title);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function titleGet(_x) {
    return _ref.apply(this, arguments);
  };
}();

var movieCreate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(title, gif, db, req) {
    var movieId, path;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            movieId = new _mongodb.ObjectID();
            path = "\n    ".concat((0, _variable.hostUrlGet)(req), "/output/").concat(movieId.toString(), ".gif\n  ").trim();
            return _context2.abrupt("return", (0, _movie.movieCreate)({
              _id: movieId
            }, {
              $set: {
                title: title,
                gif: gif,
                path: path
              }
            }, undefined, db));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function movieCreate(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var process = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(text, genre, db, req) {
    var movieDataBasic, characters, segments, cards, gif, movie;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _movieDataBasicGet["default"])(text);

          case 2:
            movieDataBasic = _context3.sent;

            if (!(!movieDataBasic.plot || !movieDataBasic.cast)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {});

          case 5:
            _context3.next = 7;
            return (0, _charactersGet["default"])(movieDataBasic.cast, movieDataBasic.plot, movieDataBasic.plotText);

          case 7:
            characters = _context3.sent;
            segments = (0, _segmentsGet["default"])(movieDataBasic.plot, characters);
            _context3.next = 11;
            return (0, _cardsGet["default"])(segments, genre, db);

          case 11:
            cards = _context3.sent;
            _context3.next = 14;
            return (0, _gifGet["default"])(movieDataBasic.title, movieDataBasic.poster, characters, cards);

          case 14:
            gif = _context3.sent;
            _context3.next = 17;
            return movieCreate(movieDataBasic.title, gif, db, req);

          case 17:
            movie = _context3.sent;
            _context3.next = 20;
            return (0, _movieWrite["default"])(movie);

          case 20:
            return _context3.abrupt("return", movie);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function process(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(text, genre, db, req) {
    var title;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return titleGet(text);

          case 2:
            title = _context4.sent;
            return _context4.abrupt("return", process(title, genre, db, req));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=index.js.map