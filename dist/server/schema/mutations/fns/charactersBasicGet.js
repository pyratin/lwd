'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _castNNPsGet = _interopRequireDefault(require("./castNNPsGet"));

var _NNPCrossMatchGet = _interopRequireDefault(require("./NNPCrossMatchGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _charactersGetFn = function _charactersGetFn(plotCharacter, castCharacters) {
  var character = castCharacters.reduce(function (memo, castCharacter) {
    var match = (0, _NNPCrossMatchGet["default"])(plotCharacter.text, castCharacter.text);

    if (!memo && match) {
      return _objectSpread(_objectSpread({}, castCharacter), match);
    }

    return memo;
  }, null);
  return character;
};

var NNPCrossMatchesGet = function NNPCrossMatchesGet(plotCharacters, castCharacters) {
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

      case a.distance > b.distance:
        return 1;

      case b.distance > a.distance:
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

var charactersCastDataAssignedGet = function charactersCastDataAssignedGet(characters, cast) {
  return characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), cast[character.castIndex])]);
  }, []).map(function (character) {
    delete character.distance;
    return character;
  });
};

var _default = function _default(cast, plot) {
  var plotCharacters = (0, _plotNNPsGet["default"])(plot);
  var castCharacters = (0, _castNNPsGet["default"])(cast);
  var characters = NNPCrossMatchesGet(plotCharacters, castCharacters);
  characters = charactersSortedGet(characters);
  characters = charactersUniqueMatchesGet(characters);
  characters = charactersCastDataAssignedGet(characters, cast);
  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=charactersBasicGet.js.map