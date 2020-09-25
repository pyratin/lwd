'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var characterExistsGet = function characterExistsGet(character, _characters) {
  return _characters.find(function (_character) {
    return _character.role === character.role && _character.roleGroupIndex === character.roleGroupIndex;
  });
};

var _default = function _default(_characters) {
  var characters = _characters.reduce(function (memo, _character) {
    var exists = characterExistsGet(_character, memo);

    if (_character.starringCardIndexes && !exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _character), {}, {
        render: true
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _character), {}, {
      render: false
    })]);
  }, []);

  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=charactersMetaRenderAssignedGet.js.map