'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _NNPCrossMatchesGet = _interopRequireDefault(require("./NNPCrossMatchesGet"));

var _default = function _default(NNPs, _NNPs, strict) {
  var matches = NNPs.reduce(function (memo, NNP) {
    var matches = (0, _NNPCrossMatchesGet["default"])(NNP, _NNPs, strict);

    if (matches) {
      return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(matches));
    }

    return memo;
  }, []);
  return matches;
};

exports["default"] = _default;
//# sourceMappingURL=NNPsCrossMatchesGet.js.map