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

var _base64FilterAppliedGet = _interopRequireDefault(require("./base64FilterAppliedGet"));

var _base64TextCompositedGet = _interopRequireDefault(require("./base64TextCompositedGet"));

var _variable = require("../../../fns/variable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cardsFilterTypeAssignedGetFn = function cardsFilterTypeAssignedGetFn(card) {
  var _card$character;

  switch (true) {
    case !(card === null || card === void 0 ? void 0 : (_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.text):
      return 'giphy';

    case card.dualRoleIndex >= 0:
      return 'dualRole';

    default:
      return null;
  }
};

var cardsFilterTypeAssignedGet = function cardsFilterTypeAssignedGet(_cards) {
  var cards = _cards.reduce(function (memo, _card) {
    var filterType = cardsFilterTypeAssignedGetFn(_card);
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _card), {}, {
      filterType: filterType
    })]);
  }, []);

  return cards;
};

var cardsFilterAppliedGet = function cardsFilterAppliedGet(cards) {
  return cards.reduce(function (memo, card) {
    return memo.then(function (res) {
      if (card.filterType) {
        return (0, _base64FilterAppliedGet["default"])(card).then(function (result) {
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
      var _card$character2;

      var characterText = card === null || card === void 0 ? void 0 : (_card$character2 = card.character) === null || _card$character2 === void 0 ? void 0 : _card$character2.text;
      var text = card.text;

      if (characterText) {
        text = text.replace(new RegExp(characterText), "\n                <b>".concat(characterText, "</b>\n              ").trim());
      }

      return (0, _base64TextCompositedGet["default"])(card.base64, text, (0, _variable.outputResGet)(), 20, 10).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [result]);
      });
    });
  }, Promise.resolve([]));
};

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_cards) {
    var cards, base64s;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cards = cardsFilterTypeAssignedGet(_cards);
            _context.next = 3;
            return cardsFilterAppliedGet(cards);

          case 3:
            cards = _context.sent;
            _context.next = 6;
            return cardsRenderedGet(cards);

          case 6:
            base64s = _context.sent;
            return _context.abrupt("return", base64s);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=cardsRenderedGet.js.map