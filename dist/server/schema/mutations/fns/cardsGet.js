'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cardsBasicGet = _interopRequireDefault(require("./cardsBasicGet"));

var _cardsActorReplacedGet = _interopRequireDefault(require("./cardsActorReplacedGet"));

var _cardsGifyAssignedGet = _interopRequireDefault(require("./cardsGifyAssignedGet"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(segments, genre, db) {
    var cards;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cards = (0, _cardsBasicGet["default"])(segments);
            _context.next = 3;
            return (0, _cardsActorReplacedGet["default"])(cards, genre, db);

          case 3:
            cards = _context.sent;
            _context.next = 6;
            return (0, _cardsGifyAssignedGet["default"])(cards);

          case 6:
            cards = _context.sent;
            return _context.abrupt("return", cards);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=cardsGet.js.map