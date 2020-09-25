'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var charactersPreviousGet = function charactersPreviousGet(cards) {
  return cards.reduce(function (memo, _ref) {
    var character = _ref.character;

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
    }

    return memo;
  }, []);
};

var charactersWeightedGetFn = function charactersWeightedGetFn(character, charactersPrevious) {
  return charactersPrevious.reduce(function (memo, _charactersPrevious, index) {
    if (_charactersPrevious.actor.text === character.actor.text) {
      return _objectSpread(_objectSpread({}, memo), {}, {
        count: memo.count + 1,
        nearest: charactersPrevious.length - (index + 1)
      });
    }

    return memo;
  }, _objectSpread(_objectSpread({}, character), {}, {
    count: 0,
    nearest: charactersPrevious.length
  }));
};

var charactersWeightedGet = function charactersWeightedGet(characters, charactersPrevious) {
  return characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [charactersWeightedGetFn(character, charactersPrevious)]);
  }, []);
};

var _characterAssignedGetFn = function _characterAssignedGetFn(charactersWeighted) {
  return charactersWeighted.sort(function (a, b) {
    switch (true) {
      case a.nearest > b.nearest:
        return -1;

      case b.nearest > a.nearest:
        return 1;

      case a.count > b.count:
        return 1;

      case b.count > a.count:
        return -1;

      case a.castIndex > b.castIndex:
        return 1;

      case b.castIndex > a.castIndex:
        return -1;
    }
  })[0];
};

var characterAssignedGetFn = function characterAssignedGetFn(card, charactersPrevious) {
  var charactersWeighted = charactersWeightedGet(card.characters, charactersPrevious);

  var character = _characterAssignedGetFn(charactersWeighted);

  character === null || character === void 0 ? true : delete character.count;
  character === null || character === void 0 ? true : delete character.nearest;
  return _objectSpread(_objectSpread({}, card), {}, {
    character: character
  });
};

var _default = function _default(_cards) {
  var cards = _cards.reduce(function (memo, _card) {
    var charactersPrevious = charactersPreviousGet(memo);
    var card = characterAssignedGetFn(_card, charactersPrevious);
    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);

  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=cardsCharacterAssignedGet.js.map