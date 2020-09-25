'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _child_process = require("child_process");

var _streamcat = _interopRequireDefault(require("streamcat"));

var miffsGetFn = function miffsGetFn(base64) {
  return new Promise(function (resolve, reject) {
    var buffer = new Buffer.from(base64.replace(/^data:image\/(jpeg|png);base64,/, ''), 'base64');
    var proc = (0, _child_process.exec)('convert - miff:-', {
      encoding: base64
    }, function (error, stdout) {
      if (error) {
        return reject(error);
      }

      return resolve(stdout);
    });
    proc.stdin.write(buffer);
    proc.stdin.end();
  });
};

var _default = function _default(base64s) {
  return base64s.reduce(function (memo, base64) {
    return memo.then(function (res) {
      return miffsGetFn(base64).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [result]);
      });
    });
  }, Promise.resolve([])).then(function (miffs) {
    return (0, _streamcat["default"])(miffs);
  });
};

exports["default"] = _default;
//# sourceMappingURL=base64MiffStreamsConcatedGet.js.map