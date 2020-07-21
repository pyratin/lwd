'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _child_process = require("child_process");

var _variable = require("../../../fns/variable");

var _base64TextCompositedGet = _interopRequireDefault(require("./base64TextCompositedGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

var base64BlankGet = function base64BlankGet() {
  return new Promise(function (resolve, reject) {
    return _fs["default"].readFile(_path["default"].join(process.cwd(), 'media/blank.jpeg'), 'base64', function (error, res) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/jpeg;base64,".concat(res, "\n            ").trim());
    });
  });
};

var charactersGet = function charactersGet(cards) {
  return cards.reduce(function (memo, card) {
    if (card.character && !memo.find(function (_memo) {
      return _memo.text === card.character;
    })) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [{
        text: card.character,
        base64: card.base64
      }]);
    }

    return memo;
  }, []);
};

var moviePosterBase64GetFn = function moviePosterBase64GetFn(buffer) {
  return new Promise(function (resolve, reject) {
    var res = (0, _variable.outputResGet)();
    var proc = (0, _child_process.exec)("\n          convert \n          \\(\n            -size ".concat(res, "x").concat(res, "\n            xc:\"#000\" \n          \\)\n          \\(\n            jpeg:-\n            -resize ").concat(res, "x").concat(res, "\n          \\)\n          -gravity center\n          -compose blend\n          -define compose:args=50\n          -composite\n          jpeg:-\n        ").split(/\s/).reduce(function (memo, _command) {
      return "\n                ".concat(memo, " ").concat(_command, "\n              ").trim();
    }, ''), {
      encoding: 'base64'
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/jpeg;base64,".concat(stdout, "\n            ").trim());
    });
    proc.stdin.write(buffer);
    proc.stdin.end();
  });
};

var moviePosterBase64Get = function moviePosterBase64Get(moviePoster) {
  if (!moviePoster) {
    return base64BlankGet();
  }

  return (0, _nodeFetch["default"])(moviePoster).then(function (res) {
    return res.buffer();
  }).then(function (buffer) {
    return moviePosterBase64GetFn(buffer);
  });
};

var characterBase64sGet = function characterBase64sGet(characters) {
  return characters.reduce(function (memo, character) {
    return memo.then(function (res) {
      return (0, _base64TextCompositedGet["default"])(character.base64, "\n              ".concat(character.text, "\n            ").trim(), (0, _variable.outputResGet)() / 3.5, 50, 10).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [result]);
      });
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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(characters) {
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
    return _ref.apply(this, arguments);
  };
}();

var finalCompositedGetFn = function finalCompositedGetFn(finalCompositeMiffStreamsConcated) {
  return new Promise(function (resolve, reject) {
    var proc = (0, _child_process.exec)('convert miff:- -gravity north -composite jpeg:-', {
      encoding: 'base64'
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/jpeg;base64,".concat(stdout, "\n            ").trim());
    });
    finalCompositeMiffStreamsConcated.pipe(proc.stdin);
  });
};

var finalCompositedGet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(movieTitle, moviePosterBase64, charactersMontageBase64) {
    var res, pointsize, border, finalCompositeMiffStreamsConcated, splash;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = (0, _variable.outputResGet)();
            pointsize = 20;
            border = 10;

            if (charactersMontageBase64) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", (0, _base64TextCompositedGet["default"])(moviePosterBase64, movieTitle, res, pointsize, border));

          case 5:
            _context2.next = 7;
            return (0, _base64MiffStreamsConcatedGet["default"])([moviePosterBase64, charactersMontageBase64]);

          case 7:
            finalCompositeMiffStreamsConcated = _context2.sent;
            _context2.next = 10;
            return finalCompositedGetFn(finalCompositeMiffStreamsConcated);

          case 10:
            splash = _context2.sent;
            _context2.next = 13;
            return (0, _base64TextCompositedGet["default"])(splash, movieTitle, res, pointsize, border);

          case 13:
            splash = _context2.sent;
            return _context2.abrupt("return", splash);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function finalCompositedGet(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(movieTitle, moviePoster, cards) {
    var characters, moviePosterBase64, charactersMontageBase64, splash;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            characters = charactersGet(cards);
            _context3.next = 3;
            return moviePosterBase64Get(moviePoster);

          case 3:
            moviePosterBase64 = _context3.sent;
            _context3.next = 6;
            return charactersMontageGet(characters);

          case 6:
            charactersMontageBase64 = _context3.sent;
            _context3.next = 9;
            return finalCompositedGet(movieTitle, moviePosterBase64, charactersMontageBase64);

          case 9:
            splash = _context3.sent;
            return _context3.abrupt("return", splash);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=splashGet.js.map