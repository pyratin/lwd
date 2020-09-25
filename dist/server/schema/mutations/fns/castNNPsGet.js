'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sentencesTokenizedGet = _interopRequireDefault(require("./sentencesTokenizedGet"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _NNPsUniqueGet = _interopRequireDefault(require("./NNPsUniqueGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var sentenceNNPsGet = function sentenceNNPsGet(sentence, sentenceIndex, castIndex) {
  return (0, _NNPsGet["default"])(sentence).map(function (NNP) {
    var possessive = !!sentence.match(new RegExp("\n                ".concat(NNP.text, "'s\n              ").trim()));
    return _objectSpread(_objectSpread({}, NNP), {}, {
      possessive: possessive,
      sentenceIndex: sentenceIndex,
      castIndex: castIndex
    });
  });
};

var _castNNPsGet = function _castNNPsGet(_cast, castIndex) {
  return (0, _sentencesTokenizedGet["default"])(_cast.role).reduce(function (memo, sentence, sentenceIndex) {
    var NNPs = sentenceNNPsGet(sentence, sentenceIndex, castIndex);
    NNPs = NNPs.map(function (NNP) {
      var _distance = NNP.distance ? NNP.distance - NNPs[0].text.length : 0;

      return _objectSpread(_objectSpread({}, NNP), {}, {
        _distance: _distance
      });
    });
    NNPs = NNPs.filter(function (NNP) {
      return NNP.distance;
    });
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(NNPs));
  }, []);
};

var _default = function _default(cast) {
  var uniqueFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var castNNPs = cast.reduce(function (memo, _cast, castIndex) {
    var NNPs = _castNNPsGet(_cast, castIndex);

    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(NNPs));
  }, []);

  if (uniqueFlag) {
    castNNPs = (0, _NNPsUniqueGet["default"])(castNNPs);
  }

  castNNPs = castNNPs.map(function (castNNP, index) {
    return _objectSpread(_objectSpread({}, castNNP), {}, {
      index: index
    });
  });
  return castNNPs;
};

exports["default"] = _default;
//# sourceMappingURL=castNNPsGet.js.map