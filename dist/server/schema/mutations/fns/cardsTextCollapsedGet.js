'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cardsTextCollapsedGetFn = function cardsTextCollapsedGetFn(card) {
  var text = card.text.reduce(function (memo, fragment) {
    return "".concat(memo).concat(fragment.text);
  }, '');
  return _objectSpread(_objectSpread({}, card), {}, {
    text: text
  });
};

var cardsTextCollapsedGet = function cardsTextCollapsedGet(cards) {
  return cards.reduce(function (memo, card) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread({}, cardsTextCollapsedGetFn(card))]);
  }, []);
};

var _default = function _default(cards) {
  return cardsTextCollapsedGet(cards);
};

exports["default"] = _default;
//# sourceMappingURL=cardsTextCollapsedGet.js.map