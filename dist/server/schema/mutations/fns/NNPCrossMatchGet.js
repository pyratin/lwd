'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _combinations = _interopRequireDefault(require("combinations"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

var characterStringMatchedGet = function characterStringMatchedGet(character, _character) {
  return character === _character ? '0' : null;
};

var characterTokenizedGet = function characterTokenizedGet(character) {
  return (0, _wordsTokenizedGet["default"])(character).map(function (_ref) {
    var text = _ref.text;
    return text;
  });
};

var characterTokensMatchedGet = function characterTokensMatchedGet(character, _character) {
  var characterTokenCombinations = (0, _combinations["default"])(characterTokenizedGet(_character)).reduce(function (memo, characterTokenCombination) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterTokenCombination.join(' ')]);
  }, []);
  var characterToken = characterTokenCombinations.find(function (characterToken) {
    return characterToken === character;
  });
  return characterToken ? '1' : null;
};

var _characterTokensMatchedGet = function _characterTokensMatchedGet(character, _character) {
  var characterTokenCombinations = (0, _combinations["default"])(characterTokenizedGet(character)).reduce(function (memo, characterTokenCombination) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterTokenCombination.join(' ')]);
  }, []);

  var _characterTokenCombinations = (0, _combinations["default"])(characterTokenizedGet(_character)).reduce(function (memo, _characterTokenCombination) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_characterTokenCombination.join(' ')]);
  }, []);

  var characterToken = _characterTokenCombinations.find(function (_characterToken) {
    return characterTokenCombinations.find(function (characterToken) {
      return characterToken === _characterToken;
    });
  });

  return characterToken ? '2' : null;
};

var _default = function _default(character, _character) {
  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!character || !_character) {
    return null;
  }

  var NNPmatchIndexString;

  switch (true) {
    case (NNPmatchIndexString = characterStringMatchedGet(character, _character)) && !!NNPmatchIndexString:
    case !strict && (NNPmatchIndexString = characterTokensMatchedGet(character, _character)) && !!NNPmatchIndexString:
    case !strict && (NNPmatchIndexString = characterTokensMatchedGet(_character, character)) && !!NNPmatchIndexString:
    case !strict && (NNPmatchIndexString = _characterTokensMatchedGet(character, _character)) && !!NNPmatchIndexString:
      return {
        text: character,
        NNPmatchIndex: parseInt(NNPmatchIndexString)
      };
  }
};

exports["default"] = _default;
//# sourceMappingURL=NNPCrossMatchGet.js.map