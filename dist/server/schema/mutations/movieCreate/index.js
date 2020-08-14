'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var charactersPostSegmentsGet = function charactersPostSegmentsGet(characters) {
  return characters.reduce(function (memo, character) {
    var text = character.levenMatchText || character.text;
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      text: text
    })]);
  }, []);
};

var movieCreate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(title, base64, db, req) {
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
                base64: base64,
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

var successHandle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(title, base64, db, req) {
    var movie;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return movieCreate(title, base64, db, req);

          case 2:
            movie = _context3.sent;
            _context3.next = 5;
            return (0, _movieWrite["default"])(movie);

          case 5:
            return _context3.abrupt("return", movie);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function successHandle(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var processFn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(text, genre, db, req) {
    var movieDataBasic, characters, segments, cards, base64;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _movieDataBasicGet["default"])(text);

          case 2:
            movieDataBasic = _context4.sent;

            if (!(!(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.plot) || !(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.cast))) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", {});

          case 5:
            _context4.next = 7;
            return (0, _charactersGet["default"])(movieDataBasic.cast, movieDataBasic.plot, movieDataBasic.plotText);

          case 7:
            characters = _context4.sent;
            segments = (0, _segmentsGet["default"])(movieDataBasic.plot, characters);
            characters = charactersPostSegmentsGet(characters);
            _context4.next = 12;
            return (0, _cardsGet["default"])(segments, genre, db);

          case 12:
            cards = _context4.sent;
            _context4.next = 15;
            return (0, _gifGet["default"])(movieDataBasic.title, movieDataBasic.poster, cards);

          case 15:
            base64 = _context4.sent;

            if (!(movieDataBasic.title && base64)) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", successHandle(movieDataBasic.title, base64, db, req));

          case 18:
            return _context4.abrupt("return", {
              title: movieDataBasic.base64
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function processFn(_x10, _x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var process = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(text, genre, db, req) {
    var title, movie;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return titleGet(text);

          case 2:
            title = _context5.sent;
            _context5.next = 5;
            return processFn(title, genre, db, req);

          case 5:
            movie = _context5.sent;

            if (!(text.match(/^random:/) && !movie.base64)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", process(text, genre, db, req));

          case 8:
            return _context5.abrupt("return", movie);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function process(_x14, _x15, _x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = process;
exports["default"] = _default;
//# sourceMappingURL=index.js.map