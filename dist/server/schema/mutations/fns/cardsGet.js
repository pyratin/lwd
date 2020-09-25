'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cardsCharactersAssignedGet = _interopRequireDefault(require("./cardsCharactersAssignedGet"));

var _cardsCharacterAssignedGet = _interopRequireDefault(require("./cardsCharacterAssignedGet"));

var _default = function _default(plot, characters) {
  var cards = (0, _cardsCharactersAssignedGet["default"])(plot, characters);
  cards = (0, _cardsCharacterAssignedGet["default"])(cards, characters);
  return cards;
};

exports["default"] = _default;
//# sourceMappingURL=cardsGet.js.map