'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _spoofNamesGet = _interopRequireDefault(require("./spoofNamesGet"));

var spoofNamesGet = function spoofNamesGet() {
  var spoofNamesDict = (0, _spoofNamesGet["default"])();
  var spoofNames = Object.keys(spoofNamesDict).reduce(function (memo, key) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(spoofNamesDict[key]));
  }, []);
  return spoofNames;
};

var _default = function _default() {
  return [].concat((0, _toConsumableArray2["default"])(spoofNamesGet()), ['Hiccup', 'Willy', 'Neo', 'Will', 'Pi', 'Ping', 'Nux']);
};

exports["default"] = _default;
//# sourceMappingURL=NNPWhitelistGet.js.map