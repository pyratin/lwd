'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cardsCharacterAssignedGet = _interopRequireDefault(require("./cardsCharacterAssignedGet"));

var _cardsTextCollapsedGet = _interopRequireDefault(require("./cardsTextCollapsedGet"));

var _default = function _default(segments) {
  var cards = (0, _cardsCharacterAssignedGet["default"])(segments);
  cards = (0, _cardsTextCollapsedGet["default"])(cards);
  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=cardsBasicGet.js.map