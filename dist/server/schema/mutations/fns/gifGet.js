'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _child_process = require("child_process");

var _splashGet = _interopRequireDefault(require("./splashGet"));

var _base64TextCompositedGet = _interopRequireDefault(require("./base64TextCompositedGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

var _base64FilterAppliedGet = _interopRequireDefault(require("./base64FilterAppliedGet"));

var _variable = require("../../../fns/variable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cardsFilterAppliedGet = function cardsFilterAppliedGet(cards) {
  return cards.reduce(function (memo, card) {
    return memo.then(function (res) {
      if (!card.character) {
        return (0, _base64FilterAppliedGet["default"])(card.base64).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, card), {}, {
            base64: result
          })]);
        });
      }

      return [].concat((0, _toConsumableArray2["default"])(res), [card]);
    });
  }, Promise.resolve([]));
};

var cardsRenderedGet = function cardsRenderedGet(cards) {
  return cards.reduce(function (memo, card) {
    return memo.then(function (res) {
      var character = card.character;
      var text = card.text;

      if (character) {
        text = text.replace(new RegExp(character), "\n                <b>".concat(character, "</b>\n              ").trim());
      }

      return (0, _base64TextCompositedGet["default"])(card.base64, text, (0, _variable.outputResGet)(), 20, 10).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [result]);
      });
    });
  }, Promise.resolve([]));
};

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

var gifOptimizedGet = function gifOptimizedGet(gif) {
  return new Promise(function (resolve, reject) {
    var buffer = new Buffer.from(gif, 'base64');
    var proc = (0, _child_process.exec)('convert gif:- -coalesce -fuzz 5% -layers optimize gif:-', {
      encoding: 'base64'
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/gif;base64,".concat(stdout, "\n            ").trim());
    });
    proc.stdin.write(buffer);
    proc.stdin.end();
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
            _context.next = 9;
            return gifOptimizedGet(gif);

          case 9:
            gif = _context.sent;
            return _context.abrupt("return", gif);

          case 11:
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(movieTitle, moviePoster, characters, _cards) {
    var cards, base64s, splash, gif;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cardsFilterAppliedGet(_cards);

          case 2:
            cards = _context2.sent;
            _context2.next = 5;
            return cardsRenderedGet(cards);

          case 5:
            base64s = _context2.sent;
            _context2.next = 8;
            return (0, _splashGet["default"])(movieTitle, moviePoster, characters, cards);

          case 8:
            splash = _context2.sent;
            _context2.next = 11;
            return gifGet(splash, base64s);

          case 11:
            gif = _context2.sent;
            return _context2.abrupt("return", gif);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=gifGet.js.map