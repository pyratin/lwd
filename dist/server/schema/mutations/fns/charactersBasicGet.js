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

var characterStringMatchedGet = function characterStringMatchedGet(character, _character) {
  return character === _character ? {
    text: _character,
    matchMethodIndex: 0,
    matchReturned: 'plotCharacter'
  } : null;
};

var characterLevenMatchedGet = function characterLevenMatchedGet(character, _character) {
  return (0, _leven["default"])(character, _character) === 1 ? {
    text: _character,
    matchMethodIndex: 1,
    matchReturned: 'plotCharacter'
  } : null;
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

  return tokensSource === 'plotCharacter' ? {
    text: character,
    matchMethodIndex: 2,
    matchReturned: 'castCharacter'
  } : {
    text: _character,
    matchMethodIndex: 2,
    matchReturned: 'plotCharacter'
  };
};

var __castCharactersGetFn = function __castCharactersGetFn(castCharacter, plotCharacter) {
  var match;

  switch (true) {
    case (match = characterStringMatchedGet(castCharacter.text, plotCharacter)) && !!match.text:
    case (match = characterLevenMatchedGet(castCharacter.text, plotCharacter)) && !!match.text:
    case (match = characterFragmentMatchedGet(plotCharacter, castCharacter.text, 'plotCharacter')) && !!match.text:
    case (match = characterFragmentMatchedGet(castCharacter.text, plotCharacter, 'castCharacter')) && !!match.text:
      return _objectSpread(_objectSpread({}, castCharacter), match);
  }
};

var _castCharactersGetFn = function _castCharactersGetFn(_castCharacter, plotCharacters) {
  var castCharacter = plotCharacters.reduce(function (memo, plotCharacter) {
    var castCharacter = __castCharactersGetFn(_castCharacter, plotCharacter);

    if (!memo && castCharacter) {
      return castCharacter;
    }

    return memo;
  }, null);
  return castCharacter;
};

var castCharactersGetFn = function castCharactersGetFn(castCharacters, plotCharacters) {
  var castCharacter = castCharacters.reduce(function (memo, _castCharacter) {
    var castCharacter = _castCharactersGetFn(_castCharacter, plotCharacters);

    if (castCharacter) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [castCharacter]);
    }

    return memo;
  }, []);
  return castCharacter;
};

var castCharactersSortedGet = function castCharactersSortedGet(castCharacters) {
  return castCharacters.sort(function (a, b) {
    switch (true) {
      case a.possessive && !b.possessive:
        return 1;

      case b.possessive && !a.possessive:
        return -1;

      case a.matchReturned === 'plotCharacter' && b.matchReturned === 'castCharacter':
        return -1;

      case b.matchReturned === 'plotCharacter' && a.matchReturned === 'castCharacter':
        return 1;

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
    var exists = __castCharactersGetFn(character, _character.text);

    if (!memo && exists) {
      return true;
    }

    return memo;
  }, false);
};

var castCharactersUniqueGet = function castCharactersUniqueGet(castCharacters) {
  return castCharacters.reduce(function (memo, castCharacter) {
    if (!characterExistsGet(castCharacter, memo)) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [castCharacter]);
    }

    return memo;
  }, []);
};

var castCharactersGet = function castCharactersGet(cast, plotCharacters) {
  var castCharacters = castCharactersFlatlistGet(cast);
  castCharacters = castCharactersGetFn(castCharacters, plotCharacters);
  castCharacters = castCharactersSortedGet(castCharacters);
  castCharacters = castCharactersUniqueGet(castCharacters);
  return castCharacters;
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
  var castCharacters = castCharactersGet(cast, plotCharacters);
  var characters = charactersCastDataAssignedGet(castCharacters, cast);
  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=charactersBasicGet.js.map