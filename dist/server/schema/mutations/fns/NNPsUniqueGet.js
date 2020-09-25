'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var NNPExistsGet = function NNPExistsGet(_ref, _NNPs) {
  var text = _ref.text;
  return _NNPs.find(function (_ref2) {
    var _text = _ref2.text;
    return _text === text;
  });
};

var _default = function _default(NNPs) {
  return NNPs.reduce(function (memo, NNP) {
    var exists = NNPExistsGet(NNP, memo);

    if (!exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [NNP]);
    }

    return memo;
  }, []);
};

exports["default"] = _default;
//# sourceMappingURL=NNPsUniqueGet.js.map