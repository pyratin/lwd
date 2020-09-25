'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _deckCharactersSpoofedGet = _interopRequireDefault(require("./deckCharactersSpoofedGet"));

var _deckCardsSpoofedGet = _interopRequireDefault(require("./deckCardsSpoofedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(deck, genre) {
  if (!genre.match(/^spoof-/)) {
    return deck;
  }

  var characters = (0, _deckCharactersSpoofedGet["default"])(deck.splash.characters, genre);
  var cards = (0, _deckCardsSpoofedGet["default"])(deck.cards, characters);
  return _objectSpread(_objectSpread({}, deck), {}, {
    splash: _objectSpread(_objectSpread({}, deck.splash), {}, {
      characters: characters
    }),
    cards: cards
  });
};

exports["default"] = _default;
//# sourceMappingURL=deckSpoofedGet.js.map