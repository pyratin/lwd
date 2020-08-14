'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _default = function _default(plot) {
  return plot.reduce(function (memo, sentence) {
    return (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])((0, _NNPsGet["default"])(sentence.text, false).map(function (NNP) {
      return NNP;
    })))));
  }, []);
};

exports["default"] = _default;
//# sourceMappingURL=plotNNPsGet.js.map