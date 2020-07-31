'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var base64FilterAppliedGetFn = function base64FilterAppliedGetFn(base64, filter) {
  return new Promise(function (resolve, reject) {
    var buffer = new Buffer.from(base64.replace(/^data:image\/(jpeg|png);base64,/, ''), 'base64');

    var filterPath = _path["default"].join(process.cwd(), 'js/server/schema/mutations/fns', filter);

    var proc = (0, _child_process.exec)("\n          ".concat(filterPath, " - jpeg:-\n        ").trim(), {
      encoding: 'base64'
    }, function (error, res) {
      if (error) {
        return reject(error);
      }

      return resolve("\n              data:image/jpeg;base64,".concat(res, "\n            ").trim());
    });
    proc.stdin.write(buffer);
    proc.stdin.end();
  });
};

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_base64) {
    var base64;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ['vintage3', 'vignette3'].reduce(function (memo, filter) {
              return memo.then(function (res) {
                return base64FilterAppliedGetFn(res, filter).then(function (result) {
                  return result;
                });
              });
            }, Promise.resolve(_base64));

          case 2:
            base64 = _context.sent;
            return _context.abrupt("return", base64);

          case 4:
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
//# sourceMappingURL=base64FilterAppliedGet.js.map