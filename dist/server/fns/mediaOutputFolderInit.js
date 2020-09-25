'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _default = function _default() {
  return new Promise(function (resolve, reject) {
    var mediaOutputFolderPath = _path["default"].join(process.cwd(), 'media/output');

    if (!_fs["default"].existsSync(mediaOutputFolderPath)) {
      return _fs["default"].mkdir(mediaOutputFolderPath, {}, function (error, res) {
        if (error) {
          return reject(error);
        }

        return resolve(res);
      });
    }

    return resolve(null);
  });
};

exports["default"] = _default;
//# sourceMappingURL=mediaOutputFolderInit.js.map