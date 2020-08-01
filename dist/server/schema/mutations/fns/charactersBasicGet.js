'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _leven = _interopRequireDefault(require("leven"));

var _combinations = _interopRequireDefault(require("combinations"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var plotCharactersGet = function plotCharactersGet(plot) {
  return plot.reduce(function (memo, sentence) {
    return (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])((0, _NNPsGet["default"])(sentence.text)))));
  }, []);
};

var castCharactersFlatlistGet = function castCharactersFlatlistGet(cast) {
  return cast.reduce(function (_castMemo, _cast, castIndex) {
    var castCharacters = (0, _NNPsGet["default"])(_cast.role).reduce(function (castCharacterMemo, text) {
      var possessive = !!_cast.role.match(new RegExp("\n                    ".concat(text, "'s\n                  ").trim()));
      return [].concat((0, _toConsumableArray2["default"])(castCharacterMemo), [{
        text: text,
        castIndex: castIndex,
        roleIndex: _cast.role.match(text).index,
        possessive: possessive
      }]);
    }, []);
    return [].concat((0, _toConsumableArray2["default"])(_castMemo), (0, _toConsumableArray2["default"])(castCharacters));
  }, []);
};

var characterStringMatchedGet = function characterStringMatchedGet(plotCharacter, castCharacter) {
  return plotCharacter === castCharacter ? plotCharacter : null;
};

var characterLevenMatchedGet = function characterLevenMatchedGet(plotCharacter, castCharacter) {
  var character = (0, _leven["default"])(plotCharacter, castCharacter) === 1 ? plotCharacter : null;
  return character;
};

var characterTokenizedGet = function characterTokenizedGet(character) {
  return (0, _wordsTokenizedGet["default"])(character).map(function (_ref) {
    var text = _ref.text;
    return text;
  });
};

var characterFragmentMatchedGet = function characterFragmentMatchedGet(character, _character, tokensSource) {
  var characterTokenCombinations = (0, _combinations["default"])(characterTokenizedGet(_character)).reduce(function (memo, characterTokenCombination) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterTokenCombination.join(' ')]);
  }, []);
  var characterToken = characterTokenCombinations.find(function (characterToken) {
    return characterToken === character;
  });

  if (!characterToken) {
    return null;
  }

  return tokensSource === 'castCharacter' ? character : _character;
};

var __charactersGetFn = function __charactersGetFn(plotCharacter, castCharacter) {
  var characterText;

  switch (true) {
    case (characterText = characterStringMatchedGet(plotCharacter, castCharacter)) && !!characterText:
    case (characterText = characterLevenMatchedGet(plotCharacter, castCharacter)) && !!characterText:
    case (characterText = characterFragmentMatchedGet(plotCharacter, castCharacter, 'castCharacter')) && !!characterText:
    case (characterText = characterFragmentMatchedGet(castCharacter, plotCharacter, 'plotCharacter')) && !!characterText:
      return plotCharacter;
  }
};

var _charactersGetFn = function _charactersGetFn(plotCharacter, castCharacters) {
  var character = castCharacters.reduce(function (memo, castCharacter) {
    var characterText = __charactersGetFn(plotCharacter, castCharacter.text);

    if (!memo && characterText) {
      return _objectSpread(_objectSpread({}, castCharacter), {}, {
        text: characterText
      });
    }

    return memo;
  }, null);
  return character;
};

var charactersGetFn = function charactersGetFn(plotCharacters, castCharacters) {
  var characters = plotCharacters.reduce(function (memo, plotCharacter) {
    var character = _charactersGetFn(plotCharacter, castCharacters);

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
    }

    return memo;
  }, []);
  return characters;
};

var charactersSortedGet = function charactersSortedGet(castCharacters) {
  return castCharacters.sort(function (a, b) {
    switch (true) {
      case a.possessive && !b.possessive:
        return 1;

      case b.possessive && !a.possessive:
        return -1;

      case a.roleIndex > b.roleIndex:
        return 1;

      case b.roleIndex > a.roleIndex:
        return -1;

      case a.castIndex > b.castIndex:
        return 1;

      case b.castIndex > a.castIndex:
        return -1;
    }
  });
};

var characterExistsGet = function characterExistsGet(character, characters) {
  return characters.reduce(function (memo, _character) {
    var exists = character.text === _character.text;

    if (!memo && exists) {
      return true;
    }

    return memo;
  }, false);
};

var charactersUniqueMatchesGet = function charactersUniqueMatchesGet(castCharacters) {
  return castCharacters.reduce(function (memo, castCharacter) {
    var exists = characterExistsGet(castCharacter, memo);

    if (!exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [castCharacter]);
    }

    return memo;
  }, []);
};

var charactersGet = function charactersGet(cast, plotCharacters) {
  var castCharacters = castCharactersFlatlistGet(cast);
  var characters = charactersGetFn(plotCharacters, castCharacters);
  characters = charactersSortedGet(characters);
  characters = charactersUniqueMatchesGet(characters);
  return characters;
};

var charactersCastDataAssignedGet = function charactersCastDataAssignedGet(characters, cast) {
  return characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), cast[character.castIndex])]);
  }, []).map(function (character) {
    delete character.roleIndex;
    return character;
  });
};

var _default = function _default(cast, plot) {
  var plotCharacters = plotCharactersGet(plot);
  var characters = charactersGet(cast, plotCharacters);
  characters = charactersCastDataAssignedGet(characters, cast);
  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=charactersBasicGet.js.map