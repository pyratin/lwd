'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _leven = _interopRequireDefault(require("leven"));

var _combinations = _interopRequireDefault(require("combinations"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

var characterStringMatchedGet = function characterStringMatchedGet(plotCharacter, castCharacter) {
  return plotCharacter === castCharacter ? '0' : null;
};

var characterLevenMatchedGet = function characterLevenMatchedGet(plotCharacter, castCharacter) {
  return (0, _leven["default"])(plotCharacter, castCharacter) === 1 ? '1' : null;
};

var characterTokenizedGet = function characterTokenizedGet(character) {
  return (0, _wordsTokenizedGet["default"])(character).map(function (_ref) {
    var text = _ref.text;
    return text;
  });
};

var characterFragmentMatchedGet = function characterFragmentMatchedGet(character, _character) {
  var characterTokenCombinations = (0, _combinations["default"])(characterTokenizedGet(_character)).reduce(function (memo, characterTokenCombination) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterTokenCombination.join(' ')]);
  }, []);
  var characterToken = characterTokenCombinations.find(function (characterToken) {
    return characterToken === character;
  });
  return characterToken ? '2' : null;
};

var _default = function _default(plotCharacter, castCharacter) {
  var matchIndexString;

  switch (true) {
    case (matchIndexString = characterStringMatchedGet(plotCharacter, castCharacter)) && !!matchIndexString:
    case (matchIndexString = characterLevenMatchedGet(plotCharacter, castCharacter)) && !!matchIndexString:
    case (matchIndexString = characterFragmentMatchedGet(plotCharacter, castCharacter)) && !!matchIndexString:
    case (matchIndexString = characterFragmentMatchedGet(castCharacter, plotCharacter)) && !!matchIndexString:
      return {
        text: plotCharacter,
        matchIndex: parseInt(matchIndexString),
        levenMatchText: parseInt(matchIndexString) === 1 ? castCharacter : null
      };
  }
};

exports["default"] = _default;
//# sourceMappingURL=NNPCrossMatchGet.js.map