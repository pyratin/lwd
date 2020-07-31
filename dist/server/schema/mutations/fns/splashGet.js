'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _child_process = require("child_process");

var _variable = require("../../../fns/variable");

var _base64TextCompositedGet = _interopRequireDefault(require("./base64TextCompositedGet"));

var _base64MiffStreamsConcatedGet = _interopRequireDefault(require("./base64MiffStreamsConcatedGet"));

var _charactersMontageGet = _interopRequireDefault(require("./charactersMontageGet"));

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

var moviePosterBase64GetFn = function moviePosterBase64GetFn(buffer) {
  return new Promise(function (resolve, reject) {
    var res = (0, _variable.outputResGet)();
    var proc = (0, _child_process.exec)("\n          convert \n          \\(\n            -size ".concat(res, "x").concat(res, "\n            xc:\"#000\" \n          \\)\n          \\(\n            -\n            -resize ").concat(res, "x").concat(res, "\n          \\)\n          -gravity center\n          -compose blend\n          -define compose:args=50\n          -composite\n          jpeg:-\n        ").split(/\s/).reduce(function (memo, _command) {
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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(movieTitle, moviePosterBase64, charactersMontageBase64) {
    var res, pointsize, border, finalCompositeMiffStreamsConcated, splash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = (0, _variable.outputResGet)();
            pointsize = 20;
            border = 10;

            if (charactersMontageBase64) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", (0, _base64TextCompositedGet["default"])(moviePosterBase64, movieTitle, res, pointsize, border));

          case 5:
            _context.next = 7;
            return (0, _base64MiffStreamsConcatedGet["default"])([moviePosterBase64, charactersMontageBase64]);

          case 7:
            finalCompositeMiffStreamsConcated = _context.sent;
            _context.next = 10;
            return finalCompositedGetFn(finalCompositeMiffStreamsConcated);

          case 10:
            splash = _context.sent;
            _context.next = 13;
            return (0, _base64TextCompositedGet["default"])(splash, movieTitle, res, pointsize, border);

          case 13:
            splash = _context.sent;
            return _context.abrupt("return", splash);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function finalCompositedGet(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(movieTitle, moviePoster, _characters, cards) {
    var moviePosterBase64, charactersMontageBase64, splash;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return moviePosterBase64Get(moviePoster);

          case 2:
            moviePosterBase64 = _context2.sent;
            _context2.next = 5;
            return (0, _charactersMontageGet["default"])(_characters, cards);

          case 5:
            charactersMontageBase64 = _context2.sent;
            _context2.next = 8;
            return finalCompositedGet(movieTitle, moviePosterBase64, charactersMontageBase64);

          case 8:
            splash = _context2.sent;
            return _context2.abrupt("return", splash);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=splashGet.js.map