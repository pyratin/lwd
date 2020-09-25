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

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fnDelayRun = _interopRequireDefault(require("./fnDelayRun"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cardsForGifyGet = function cardsForGifyGet(cards) {
  return cards.reduce(function (cardMemo, card, cardIndex) {
    var _card$character;

    if (!(card === null || card === void 0 ? void 0 : (_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.text)) {
      return [].concat((0, _toConsumableArray2["default"])(cardMemo), [_objectSpread(_objectSpread({}, card), {}, {
        cardIndex: cardIndex
      })]);
    }

    return cardMemo;
  }, []);
};

var queryGet = function queryGet(text) {
  var gifyApiKey = process.env.npm_package_config_GIFY_API_KEY;
  return "\n    https://api.giphy.com/v1/gifs/translate?api_key=".concat(gifyApiKey, "&weirdness:=10&s=").concat(text, "\n  ").trim();
};

var fnDelayRun = function fnDelayRun(text) {
  return (0, _fnDelayRun["default"])(cardsFlatlistGifyUrlAssignedGetFn, 2000, "\n      deckCardsGifyUrlAssignedGet: ".concat(text, "\n    ").trim(), {
    text: text
  });
};

var cardsFlatlistGifyUrlAssignedGetFn = function cardsFlatlistGifyUrlAssignedGetFn(_ref) {
  var text = _ref.text;
  return (0, _nodeFetch["default"])(queryGet(encodeURIComponent(text))).then(function (res) {
    return res.json();
  }).then(function (json) {
    var _json$data$images;

    var gifyUrl = (_json$data$images = json.data.images) === null || _json$data$images === void 0 ? void 0 : _json$data$images['480w_still'].url;

    if (!gifyUrl) {
      return fnDelayRun(text);
    }

    return gifyUrl;
  })["catch"](function () {
    return fnDelayRun(text);
  });
};

var cardsFlatlistGifyUrlAssignedGet = function cardsFlatlistGifyUrlAssignedGet(cards) {
  return cards.reduce(function (memo, card) {
    return memo.then(function (res) {
      return cardsFlatlistGifyUrlAssignedGetFn(card).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, card), {}, {
          gifyUrl: result
        })]);
      });
    });
  }, Promise.resolve([]));
};

var cardByIndexGet = function cardByIndexGet(cards, cardIndex) {
  return cards.find(function (card) {
    return card.cardIndex === cardIndex;
  });
};

var cardsGifyUrlAssignedGet = function cardsGifyUrlAssignedGet(cardsFlatlist, cards) {
  return cards.reduce(function (memo, card, cardIndex) {
    var _cardsFlatlist = cardByIndexGet(cardsFlatlist, cardIndex);

    if (_cardsFlatlist) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card), {}, {
        gifyUrl: _cardsFlatlist.gifyUrl
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(deck) {
    var cardsFlatlist, cards;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cardsFlatlist = cardsForGifyGet(deck.cards);
            _context.next = 3;
            return cardsFlatlistGifyUrlAssignedGet(cardsFlatlist);

          case 3:
            cardsFlatlist = _context.sent;
            cards = cardsGifyUrlAssignedGet(cardsFlatlist, deck.cards);
            return _context.abrupt("return", _objectSpread(_objectSpread({}, deck), {}, {
              cards: cards
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=deckGifyUrlsAssignedGet.js.map