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

var _cardsRenderedGet = _interopRequireDefault(require("./cardsRenderedGet"));

var _splashGet = _interopRequireDefault(require("./splashGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var charactersFromCardsGet = function charactersFromCardsGet(cards) {
  return cards.reduce(function (memo, card) {
    var _card$character2;

    var exists = memo.find(function (_memo) {
      var _card$character;

      var characterText = card === null || card === void 0 ? void 0 : (_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.text;
      return characterText && (characterText.match(_memo.text) || _memo.text.match(characterText));
    });

    if ((card === null || card === void 0 ? void 0 : (_card$character2 = card.character) === null || _card$character2 === void 0 ? void 0 : _card$character2.text) && !exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [card.character]);
    }

    return memo;
  }, []);
};

var charactersDualRoleIndexAssignedGet = function charactersDualRoleIndexAssignedGet(_characters) {
  var characters = _characters.reduce(function (memo, _character) {
    var dualRoleIndex = memo.findIndex(function (_memo) {
      return _memo.dualRoleIndex === -1 && _memo.actor.text === _character.actor.text;
    });

    if (dualRoleIndex >= 0) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _character), {}, {
        dualRoleIndex: dualRoleIndex
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _character), {}, {
      dualRoleIndex: -1
    })]);
  }, []);

  return characters;
};

var cardsDualRoleIndexAssignedGet = function cardsDualRoleIndexAssignedGet(_cards, characters) {
  var cards = _cards.reduce(function (memo, _card) {
    var character = characters.find(function (character) {
      var _card$character3;

      return character.text === (_card === null || _card === void 0 ? void 0 : (_card$character3 = _card.character) === null || _card$character3 === void 0 ? void 0 : _card$character3.text);
    });

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _card), {}, {
        dualRoleIndex: character.dualRoleIndex
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [_card]);
  }, []);

  return cards;
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(movieTitle, moviePoster, _cards) {
    var characters, cards, cardBase64s, splash, gif;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            characters = charactersFromCardsGet(_cards);
            characters = charactersDualRoleIndexAssignedGet(characters);
            cards = cardsDualRoleIndexAssignedGet(_cards, characters);
            _context2.next = 5;
            return (0, _cardsRenderedGet["default"])(cards);

          case 5:
            cardBase64s = _context2.sent;
            _context2.next = 8;
            return (0, _splashGet["default"])(movieTitle, moviePoster, characters, cards);

          case 8:
            splash = _context2.sent;
            _context2.next = 11;
            return gifGet(splash, cardBase64s);

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

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=gifGet.js.map