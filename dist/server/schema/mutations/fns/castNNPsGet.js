'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _default = function _default(cast) {
  return cast.reduce(function (_castMemo, _cast, castIndex) {
    var castCharacters = (0, _NNPsGet["default"])(_cast.role).reduce(function (castCharacterMemo, _ref) {
      var text = _ref.text,
          distance = _ref.distance;
      var possessive = !!_cast.role.match(new RegExp("\n                    ".concat(text, "'s\n                  ").trim()));
      return [].concat((0, _toConsumableArray2["default"])(castCharacterMemo), [{
        text: text,
        castIndex: castIndex,
        possessive: possessive,
        distance: distance
      }]);
    }, []);
    return [].concat((0, _toConsumableArray2["default"])(_castMemo), (0, _toConsumableArray2["default"])(castCharacters));
  }, []);
};

exports["default"] = _default;
//# sourceMappingURL=castNNPsGet.js.map