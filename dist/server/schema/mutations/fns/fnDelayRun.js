'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fnDelay = function fnDelay(fn, delay) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(fn());
    }, delay);
  });
};

var _default = function _default(fn, delay, message) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  //eslint-disable-next-line no-console
  console.log(message);
  return fnDelay(function () {
    return fn(args);
  }, delay);
};

exports["default"] = _default;
//# sourceMappingURL=fnDelayRun.js.map