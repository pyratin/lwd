'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _movieDataBasicGet = _interopRequireDefault(require("../fns/movieDataBasicGet"));

var _charactersGet = _interopRequireDefault(require("../fns/charactersGet"));

var _segmentsGet = _interopRequireDefault(require("../fns/segmentsGet"));

var _cardsGet = _interopRequireDefault(require("../fns/cardsGet"));

var _gifGet = _interopRequireDefault(require("../fns/gifGet"));

var _movie = require("../../../data/movie");

var _movieWrite = _interopRequireDefault(require("../fns/movieWrite"));

var _movieTitleRandomGet = _interopRequireDefault(require("../fns/movieTitleRandomGet"));

var titleGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
    var match, title;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            match = text.match(/^(english|hindi|tamil):\d{4}$/);

            if (!match) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return (0, _movieTitleRandomGet["default"])(text);

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

var process = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(text, db) {
    var movieDataBasic, characters, segments, cards, gif, movie;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _movieDataBasicGet["default"])(text);

          case 2:
            movieDataBasic = _context2.sent;
            _context2.next = 5;
            return (0, _charactersGet["default"])(movieDataBasic.cast, movieDataBasic.plot, movieDataBasic.plotText);

          case 5:
            characters = _context2.sent;
            segments = (0, _segmentsGet["default"])(movieDataBasic.plot, characters);
            _context2.next = 9;
            return (0, _cardsGet["default"])(segments, db);

          case 9:
            cards = _context2.sent;
            _context2.next = 12;
            return (0, _gifGet["default"])(movieDataBasic.title, movieDataBasic.poster, cards);

          case 12:
            gif = _context2.sent;
            _context2.next = 15;
            return (0, _movie.movieCreate)({
              title: movieDataBasic.title,
              gif: gif
            }, db);

          case 15:
            movie = _context2.sent;
            _context2.next = 18;
            return (0, _movieWrite["default"])(movie);

          case 18:
            return _context2.abrupt("return", movie);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function process(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(text, db) {
    var title;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return titleGet(text);

          case 2:
            title = _context3.sent;
            return _context3.abrupt("return", process(title, db));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=index.js.map