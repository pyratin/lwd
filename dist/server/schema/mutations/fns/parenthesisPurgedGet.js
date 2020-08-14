'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_text) {
  var text = _text;

  while (text != (text = text.replace(/\s*\([^()]*\)(\s*)/g, '$1'))) {
    ;
  }

  return text;
};

exports["default"] = _default;
//# sourceMappingURL=parenthesisPurgedGet.js.map