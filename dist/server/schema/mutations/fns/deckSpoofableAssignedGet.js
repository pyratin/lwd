'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _NNPCrossMatchesGet = _interopRequireDefault(require("./NNPCrossMatchesGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var heroExistsGet = function heroExistsGet(deck) {
  var heroCharacter = deck.splash.characters.find(function (character) {
    return character.castIndex === 0 && character.actor.gender === 'man';
  });
  var NNP = {
    text: heroCharacter === null || heroCharacter === void 0 ? void 0 : heroCharacter.text,
    index: 0
  };

  var _NNPs = (0, _plotNNPsGet["default"])(deck.cards);

  var matches = (0, _NNPCrossMatchesGet["default"])(NNP, _NNPs);
  return !!matches;
};

var textIsLengthyGet = function textIsLengthyGet(deck) {
  return deck.cards.reduce(function (memo, _ref) {
    var text = _ref.text;

    if (!memo && text.length > 100 + 25) {
      return true;
    }

    return memo;
  }, false);
};

var _default = function _default(deck) {
  var heroExists = heroExistsGet(deck);
  var textIsLengthy = textIsLengthyGet(deck);
  return _objectSpread(_objectSpread({}, deck), {}, {
    splash: _objectSpread(_objectSpread({}, deck.splash), {}, {
      spoofable: !!heroExists && !textIsLengthy
    })
  });
};

exports["default"] = _default;
//# sourceMappingURL=deckSpoofableAssignedGet.js.map