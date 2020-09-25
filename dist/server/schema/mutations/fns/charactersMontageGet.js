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

var _mongodb = require("mongodb");

var _child_process = require("child_process");

var _actorImage = require("../../../data/actorImage");

var _variable = require("../../../fns/variable");

var _base64TextCompositedGet = _interopRequireDefault(require("./base64TextCompositedGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var charactersBase64AssignedGetFn = function charactersBase64AssignedGetFn(character, db) {
  if (!character.render) {
    return Promise.resolve(null);
  }

  return (0, _actorImage.actorImageFindOne)({
    _id: new _mongodb.ObjectID(character.actorImageId)
  }, undefined, db).then(function (_ref) {
    var base64 = _ref.base64;
    return base64;
  });
};

var charactersBase64AssignedGet = function charactersBase64AssignedGet(characters, db) {
  return characters.reduce(function (memo, character) {
    return memo.then(function (res) {
      return charactersBase64AssignedGetFn(character, db).then(function (result) {
        if (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, character), {}, {
            base64: result
          })]);
        }

        return [].concat((0, _toConsumableArray2["default"])(res), [character]);
      });
    });
  }, Promise.resolve([]));
};

var characterBase64sGet = function characterBase64sGet(characters) {
  return characters.reduce(function (memo, character) {
    return memo.then(function (res) {
      if (character.render) {
        return (0, _base64TextCompositedGet["default"])(character.base64, "\n                ".concat(character.renderText, "\n              ").trim(), (0, _variable.outputResGet)() / 3.5, 46, 5).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      }

      return res;
    });
  }, Promise.resolve([]));
};

var charactersCompositedBase64Get = function charactersCompositedBase64Get(characterStreamsConcated) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'row';
  return new Promise(function (resolve, reject) {
    var proc = (0, _child_process.exec)("\n          convert \n          \\(\n            miff:-\n            -bordercolor transparent\n            -border ".concat(direction === 'row' ? '2x0' : '0x2', "\n            -gravity south\n            -background none\n            ").concat(direction === 'row' ? '+' : '-', "append\n          \\)\n          png:-\n        ").split(/\s/).reduce(function (memo, _command) {
      return "\n                ".concat(memo, " ").concat(_command, "\n              ").trim();
    }, ''), {
      encoding: 'base64'
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/png;base64,".concat(stdout, "\n            ").trim());
    });
    characterStreamsConcated.pipe(proc.stdin);
  });
};

var charactersMontageGet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(characters) {
    var characterBase64s, characterRows, characterRowStreams, characterRowCompositedBase64s, characterRowCompositedStreams, charactersCompositedBase64;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (characters.length) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.resolve(null));

          case 2:
            _context.next = 4;
            return characterBase64sGet(characters);

          case 4:
            characterBase64s = _context.sent;
            characterRows = characterBase64s.reduce(function (memo, characterBase64, index) {
              if (index % 2) {
                return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, -1)), [[].concat((0, _toConsumableArray2["default"])(memo[memo.length - 1]), [characterBase64])]);
              }

              return [].concat((0, _toConsumableArray2["default"])(memo), [[characterBase64]]);
            }, []);
            _context.next = 8;
            return characterRows.reduce(function (memo, characterBase64Row) {
              return memo.then(function (res) {
                return (0, _base64MiffStreamsConcatedGet["default"])(characterBase64Row).then(function (result) {
                  return [].concat((0, _toConsumableArray2["default"])(res), [result]);
                });
              });
            }, Promise.resolve([]));

          case 8:
            characterRowStreams = _context.sent;
            _context.next = 11;
            return characterRowStreams.reduce(function (memo, characterRowStream) {
              return memo.then(function (res) {
                return charactersCompositedBase64Get(characterRowStream, 'row').then(function (result) {
                  return [].concat((0, _toConsumableArray2["default"])(res), [result]);
                });
              });
            }, Promise.resolve([]));

          case 11:
            characterRowCompositedBase64s = _context.sent;
            _context.next = 14;
            return (0, _base64MiffStreamsConcatedGet["default"])(characterRowCompositedBase64s);

          case 14:
            characterRowCompositedStreams = _context.sent;
            _context.next = 17;
            return charactersCompositedBase64Get(characterRowCompositedStreams, 'column');

          case 17:
            charactersCompositedBase64 = _context.sent;
            return _context.abrupt("return", charactersCompositedBase64);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function charactersMontageGet(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_characters, db) {
    var characters, charactersMontageBase64;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return charactersBase64AssignedGet(_characters, db);

          case 2:
            characters = _context2.sent;
            _context2.next = 5;
            return charactersMontageGet(characters);

          case 5:
            charactersMontageBase64 = _context2.sent;
            return _context2.abrupt("return", charactersMontageBase64);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersMontageGet.js.map