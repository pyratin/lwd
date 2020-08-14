'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var outputFolderPathString = 'media/output';

var _default = function _default(_ref) {
  var movieId = _ref._id,
      base64 = _ref.base64;
  return new Promise(function (resolve, reject) {
    var outputPath = _path["default"].join(process.cwd(), outputFolderPathString, "\n            ".concat(movieId, ".gif\n          ").trim());

    return _fs["default"].writeFile(outputPath, base64.replace(/^data:image\/gif;base64,/, ''), 'base64', function (error, res) {
      if (error) {
        return reject(error);
      }

      return resolve(res);
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=movieWrite.js.map