'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(characters) {
  return characters.sort(function (a, b) {
    switch (true) {
      case a.starringIndex > b.starringIndex:
        return 1;

      case b.starringIndex > a.starringIndex:
        return -1;
    }
  });
};

exports["default"] = _default;
//# sourceMappingURL=charactersSortedByStarringIndexGet.js.map