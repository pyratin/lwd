'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _NNPsCrossMatchesGet = _interopRequireDefault(require("./NNPsCrossMatchesGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _NNPsGet = function _NNPsGet(characters) {
  return characters.map(function (_ref, index) {
    var text = _ref.text;
    return {
      text: text,
      index: index
    };
  });
};

var cardGet = function cardGet(sentence, characters) {
  var NNPs = (0, _plotNNPsGet["default"])([sentence]);

  var _NNPs = _NNPsGet(characters);

  var matches = (0, _NNPsCrossMatchesGet["default"])(NNPs, _NNPs, true);
  return matches.map(function (match) {
    var NNP = NNPs[match.NNPIndex];
    return _objectSpread(_objectSpread({}, characters[match._NNPIndex]), {}, {
      distance: NNP.distance
    });
  });
};

var _default = function _default(plot, _characters) {
  var cards = plot.reduce(function (memo, sentence) {
    var characters = cardGet(sentence, _characters);

    var card = _objectSpread(_objectSpread({}, sentence), {}, {
      characters: characters
    });

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=cardsCharactersAssignedGet.js.map