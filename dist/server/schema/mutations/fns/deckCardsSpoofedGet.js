'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _NNPsCrossMatchesGet = _interopRequireDefault(require("./NNPsCrossMatchesGet"));

var _cardsCharactersAssignedGet = _interopRequireDefault(require("./cardsCharactersAssignedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _NNPsGet = function _NNPsGet(characters) {
  return characters.map(function (_ref, index) {
    var _text = _ref.text,
        text = _ref._text;
    return {
      text: text,
      _text: _text,
      index: index
    };
  });
};

var cardsSpoofedGetFn = function cardsSpoofedGetFn(card, characters) {
  var NNPs = (0, _plotNNPsGet["default"])([card]);

  var _NNPs = _NNPsGet(characters);

  var matches = (0, _NNPsCrossMatchesGet["default"])(NNPs, _NNPs, true);
  var text = matches.reduce(function (memo, match) {
    var NNP = NNPs[match.NNPIndex];
    var _distance = NNP.distance;
    var distanceOffset = memo.length - card.text.length;
    var distance = _distance + distanceOffset;
    var _NNP = _NNPs[match._NNPIndex];
    var name = _NNP.text;
    var spoofName = _NNP._text;
    var text = [].concat((0, _toConsumableArray2["default"])(memo.slice(0, distance)), [spoofName], (0, _toConsumableArray2["default"])(memo.slice(distance + name.length))).join('');
    return text;
  }, card.text);
  return _objectSpread(_objectSpread({}, card), {}, {
    _text: card.text,
    text: text
  });
};

var cardsSpoofedGet = function cardsSpoofedGet(_cards, _characters) {
  return _cards.reduce(function (memo, _card) {
    var card = cardsSpoofedGetFn(_card, _characters);
    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var cardsCharacterAssignedGet = function cardsCharacterAssignedGet(cards) {
  return cards.reduce(function (memo, card) {
    var character = card.characters.find(function (character) {
      return character._text === card.character.text;
    });
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card), {}, {
      character: character
    })]);
  }, []);
};

var _default = function _default(_cards, _characters) {
  var cards = cardsSpoofedGet(_cards, _characters);
  cards = (0, _cardsCharactersAssignedGet["default"])(cards, _characters);
  cards = cardsCharacterAssignedGet(cards);
  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=deckCardsSpoofedGet.js.map