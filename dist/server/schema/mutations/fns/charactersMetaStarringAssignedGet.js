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

var starringCharactersGet = function starringCharactersGet(cards) {
  return cards.reduce(function (memo, card, cardIndex) {
    var starringCardIndex = memo.findIndex(function (_memo) {
      var _card$character;

      return _memo.text === ((_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.text);
    });

    switch (true) {
      case !card.character:
        return memo;

      case starringCardIndex >= 0:
        return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, starringCardIndex)), [_objectSpread(_objectSpread({}, memo[starringCardIndex]), {}, {
          starringCardIndexes: [].concat((0, _toConsumableArray2["default"])(memo[starringCardIndex].starringCardIndexes), [cardIndex])
        })], (0, _toConsumableArray2["default"])(memo.slice(starringCardIndex + 1)));

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card.character), {}, {
          starringCardIndexes: [cardIndex]
        })]);
    }
  }, []);
};

var charactersStarringCardIndexesAssignedGet = function charactersStarringCardIndexesAssignedGet(characters, cards) {
  var starringCharacters = starringCharactersGet(cards);
  return characters.reduce(function (memo, character) {
    var match = starringCharacters.find(function (starringCharacter) {
      return starringCharacter.text === character.text;
    });
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      starringCardIndexes: match ? match.starringCardIndexes : null
    })]);
  }, []);
};

var charactersSortedByStarringCardIndexesGet = function charactersSortedByStarringCardIndexesGet(characters) {
  return characters.sort(function (a, b) {
    var _a$starringCardIndexe, _b$starringCardIndexe, _b$starringCardIndexe2, _a$starringCardIndexe2;

    switch (true) {
      case a.starringCardIndexes && !b.starringCardIndexes:
        return -1;

      case b.starringCardIndexes && !a.starringCardIndexes:
        return 1;

      case ((_a$starringCardIndexe = a.starringCardIndexes) === null || _a$starringCardIndexe === void 0 ? void 0 : _a$starringCardIndexe[0]) > ((_b$starringCardIndexe = b.starringCardIndexes) === null || _b$starringCardIndexe === void 0 ? void 0 : _b$starringCardIndexe[0]):
        return 1;

      case ((_b$starringCardIndexe2 = b.starringCardIndexes) === null || _b$starringCardIndexe2 === void 0 ? void 0 : _b$starringCardIndexe2[0]) > ((_a$starringCardIndexe2 = a.starringCardIndexes) === null || _a$starringCardIndexe2 === void 0 ? void 0 : _a$starringCardIndexe2[0]):
        return -1;
    }
  });
};

var charactersStarringIndexAssignedGet = function charactersStarringIndexAssignedGet(characters) {
  return characters.map(function (character, starringIndex) {
    return _objectSpread(_objectSpread({}, character), {}, {
      starringIndex: starringIndex
    });
  });
};

var _default = function _default(_characters, cards) {
  var characters = charactersStarringCardIndexesAssignedGet(_characters, cards);
  characters = charactersSortedByStarringCardIndexesGet(characters);
  characters = charactersStarringIndexAssignedGet(characters);
  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=charactersMetaStarringAssignedGet.js.map