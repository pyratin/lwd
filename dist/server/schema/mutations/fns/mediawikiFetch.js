'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fnDelayRun = _interopRequireDefault(require("./fnDelayRun"));

var fnDelayRun = function fnDelayRun(query) {
  return (0, _fnDelayRun["default"])(mediawikiFetch, 2000, "\n      mediawikiFetch: ".concat(query, "\n    ").trim(), query);
};

var mediawikiFetch = function mediawikiFetch(query) {
  return (0, _nodeFetch["default"])(query).then(function (res) {
    if (res.status !== 200) {
      return fnDelayRun(query);
    }

    return res.json();
  })["catch"](function () {
    return fnDelayRun(query);
  });
};

var _default = mediawikiFetch;
exports["default"] = _default;
//# sourceMappingURL=mediawikiFetch.js.map