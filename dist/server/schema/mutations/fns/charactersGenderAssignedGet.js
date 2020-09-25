'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _actorsGenderAssignedGet = _interopRequireDefault(require("./actorsGenderAssignedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actorsFlatlistGet = function actorsFlatlistGet(characters) {
  return characters.reduce(function (memo, character) {
    var exists = memo.find(function (_memo) {
      return _memo.text === character.actor.text;
    });

    if (!exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [character.actor]);
    }

    return memo;
  }, []);
};

var charactersActorGenderAssignedGet = function charactersActorGenderAssignedGet(characters, actors) {
  return characters.reduce(function (memo, character) {
    var actor = actors.find(function (actor) {
      return actor.text === character.actor.text;
    });
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      role: actor.gender,
      actor: _objectSpread(_objectSpread({}, character.actor), {}, {
        gender: actor.gender
      })
    })]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_characters) {
    var actors, characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actors = actorsFlatlistGet(_characters);
            _context.next = 3;
            return (0, _actorsGenderAssignedGet["default"])(actors);

          case 3:
            actors = _context.sent;
            characters = charactersActorGenderAssignedGet(_characters, actors);
            return _context.abrupt("return", characters);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersGenderAssignedGet.js.map