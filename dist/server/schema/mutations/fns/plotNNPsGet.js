'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _NNPsUniqueGet = _interopRequireDefault(require("./NNPsUniqueGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(plot) {
  var uniqueFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var plotNNPs = plot.reduce(function (memo, sentence) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])((0, _NNPsGet["default"])(sentence.text).map(function (NNP) {
      return _objectSpread(_objectSpread({}, NNP), {}, {
        paragraphIndex: sentence.paragraphIndex,
        sentenceIndex: sentence.sentenceIndex
      });
    })));
  }, []);

  if (uniqueFlag) {
    plotNNPs = (0, _NNPsUniqueGet["default"])(plotNNPs);
  }

  plotNNPs = plotNNPs.map(function (plotNNP, index) {
    return _objectSpread(_objectSpread({}, plotNNP), {}, {
      index: index
    });
  });
  return plotNNPs;
};

exports["default"] = _default;
//# sourceMappingURL=plotNNPsGet.js.map