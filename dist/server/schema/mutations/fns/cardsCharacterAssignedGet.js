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

var charactersAssignedGetFn = function charactersAssignedGetFn(fragments) {
  return fragments.reduce(function (memo, _ref) {
    var type = _ref.type,
        text = _ref.text,
        actor = _ref.actor,
        castIndex = _ref.castIndex;

    switch (true) {
      case type !== 'actor':
      case !!memo.find(function (_memo) {
        return _memo.text === text;
      }):
        return memo;

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [{
          text: text,
          actor: {
            ud: actor.ud,
            text: actor.text,
            gender: actor.gender
          },
          castIndex: castIndex
        }]);
    }
  }, []);
};

var charactersAssignedGet = function charactersAssignedGet(segments) {
  return segments.reduce(function (memo, segment) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      text: segment,
      characters: charactersAssignedGetFn(segment)
    }]);
  }, []);
};

var charactersPreviousGet = function charactersPreviousGet(cards) {
  return cards.reduce(function (memo, _ref2) {
    var character = _ref2.character;

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
        distance: charactersPrevious.length - (index + 1)
      });
    }

    return memo;
  }, _objectSpread(_objectSpread({}, character), {}, {
    count: 0,
    distance: charactersPrevious.length
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
      case a.distance > b.distance:
        return -1;

      case b.distance > a.distance:
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

  character = character ? {
    text: character.text,
    actor: character.actor
  } : null;
  return {
    text: card.text,
    character: character
  };
};

var characterAssignedGet = function characterAssignedGet(cards) {
  return cards.reduce(function (memo, _card) {
    var charactersPrevious = charactersPreviousGet(memo);
    var card = characterAssignedGetFn(_card, charactersPrevious);
    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = function _default(segments) {
  var cards = charactersAssignedGet(segments);
  cards = characterAssignedGet(cards);
  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=cardsCharacterAssignedGet.js.map