'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _charactersCategoryAssignedGet = _interopRequireDefault(require("./charactersCategoryAssignedGet"));

var _charactersActorGenderAssignedGet = _interopRequireDefault(require("./charactersActorGenderAssignedGet"));

var _charactersBasicGet = _interopRequireDefault(require("./charactersBasicGet"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cast, plot, plotText) {
    var characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            characters = (0, _charactersBasicGet["default"])(cast, plot);
            _context.next = 3;
            return (0, _charactersCategoryAssignedGet["default"])(characters, plotText);

          case 3:
            characters = _context.sent;
            _context.next = 6;
            return (0, _charactersActorGenderAssignedGet["default"])(characters);

          case 6:
            characters = _context.sent;
            return _context.abrupt("return", characters);

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
//# sourceMappingURL=charactersGet.js.map