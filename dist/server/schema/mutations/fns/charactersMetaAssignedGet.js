'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _charactersMetaStarringAssignedGet = _interopRequireDefault(require("./charactersMetaStarringAssignedGet"));

var _charactersMetaRoleAssignedGet = _interopRequireDefault(require("./charactersMetaRoleAssignedGet"));

var _charactersMetaRenderAssignedGet = _interopRequireDefault(require("./charactersMetaRenderAssignedGet"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_characters, cards, title) {
    var characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            characters = (0, _charactersMetaStarringAssignedGet["default"])(_characters, cards);
            _context.next = 3;
            return (0, _charactersMetaRoleAssignedGet["default"])(characters, title);

          case 3:
            characters = _context.sent;
            characters = (0, _charactersMetaRenderAssignedGet["default"])(characters);
            return _context.abrupt("return", characters);

          case 6:
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
//# sourceMappingURL=charactersMetaAssignedGet.js.map