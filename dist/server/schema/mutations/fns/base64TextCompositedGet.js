'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _child_process = require("child_process");

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(base64, _text, res, textPointsize, textBorder) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var text = _text.replace(/"/g, '\\"').replace(/&/g, '\\&amp;');

              var factor = res / 480;
              var command = "\n        convert \n        \\(\n          jpeg:-\n          -resize ".concat(res, "x").concat(res, "^\n          -gravity center\n          -crop ").concat(res, "x").concat(res, "+0+0\n        \\)\n        \\(\n          -size ").concat(res - textBorder * 2 * factor, "\n          -background \"#000\" \n          -fill \"#fff\" \n          -pointsize ").concat(textPointsize * factor, "\n          -font \"/media/fonts/Muli-Italic-VariableFont_wght.ttf\"\n          pango:\"").concat(text, "\" \n          -bordercolor \"#000\"\n          -border ").concat(textBorder * factor, "\n        \\)\n        -gravity south\n        -compose blend\n        -define compose:args=90\n        -composite\n        jpeg:-\n      ").split(/\s/).reduce(function (memo, _command) {
                return "\n              ".concat(memo, " ").concat(_command, "\n            ").trim();
              }, '');

              var _base64 = base64.replace(/^data:image\/jpeg;base64,/, '');

              var buffer = new Buffer.from(_base64, 'base64');
              var proc = (0, _child_process.exec)(command, {
                encoding: 'base64'
              }, function (error, stdout) {
                if (error) {
                  return reject(error);
                }

                var base64 = "\n            data:image/jpeg;base64,".concat(stdout, "\n          ").trim();
                return resolve(base64);
              });
              proc.stdin.write(buffer);
              proc.stdin.end();
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=base64TextCompositedGet.js.map