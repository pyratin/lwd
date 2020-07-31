'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var fnDelay = function fnDelay(fn, delay) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(fn());
    }, delay);
  });
};

var mediawikiFetch = function mediawikiFetch(query) {
  return (0, _nodeFetch["default"])(query).then(function (res) {
    if (res.status === 429) {
      // eslint-disable-next-line no-console
      console.log("\n              mediawikiFetch: ".concat(res.status, " ").concat(query, "\n            ").trim());
      return fnDelay(function () {
        return mediawikiFetch(query);
      }, 2000);
    }

    return res.json();
  });
};

var _default = mediawikiFetch;
exports["default"] = _default;
//# sourceMappingURL=mediawikiFetch.js.map