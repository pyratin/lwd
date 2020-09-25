'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _child_process = require("child_process");

var _cardsRenderedGet = _interopRequireDefault(require("./cardsRenderedGet"));

var _splashRenderedGet = _interopRequireDefault(require("./splashRenderedGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

var gifGetFn = function gifGetFn(miffStreamsConcated) {
  return new Promise(function (resolve, reject) {
    var proc = (0, _child_process.exec)('convert -loop 0 -delay 1000 miff:- gif:-', {
      encoding: 'base64'
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve(stdout);
    });
    miffStreamsConcated.pipe(proc.stdin);
  });
};

var gifGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(splash, base64s) {
    var input, miffStreamsConcated, gif;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = splash ? [splash].concat((0, _toConsumableArray2["default"])(base64s)) : base64s;
            _context.next = 3;
            return (0, _base64MiffStreamsConcatedGet["default"])(input);

          case 3:
            miffStreamsConcated = _context.sent;
            _context.next = 6;
            return gifGetFn(miffStreamsConcated);

          case 6:
            gif = _context.sent;
            return _context.abrupt("return", gif);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function gifGet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2, db) {
    var _splash, _cards, cardBase64s, splash, gif;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _splash = _ref2.splash, _cards = _ref2.cards;
            _context2.next = 3;
            return (0, _cardsRenderedGet["default"])(_cards, db);

          case 3:
            cardBase64s = _context2.sent;
            _context2.next = 6;
            return (0, _splashRenderedGet["default"])(_splash, db);

          case 6:
            splash = _context2.sent;
            _context2.next = 9;
            return gifGet(splash, cardBase64s);

          case 9:
            gif = _context2.sent;
            return _context2.abrupt("return", gif);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=gifRenderedGet.js.map