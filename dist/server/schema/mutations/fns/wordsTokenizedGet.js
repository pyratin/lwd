'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _natural = _interopRequireDefault(require("natural"));

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(_sentence) {
  var sentence = _sentence.replace(/(\S)\/(\S)/g, '$1 / $2');

  var tokenizer = new _natural["default"].TreebankWordTokenizer();
  var words = tokenizer.tokenize(sentence).reduce(function (memo, word, index) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      text: word,
      index: index
    }]);
  }, []);
  words = words.reduce(function (memo, word) {
    var regExpString = memo.reduce(function (regExpStringMemo, _ref) {
      var text = _ref.text;
      return "\n            ".concat(regExpStringMemo, "\\s*").concat((0, _escapeStringRegexp["default"])(text), "\n          ").trim();
    }, '');
    regExpString = "\n        ^".concat(regExpString, "\\s*\n      ").trim();
    var regExp = new RegExp(regExpString);

    var match = _sentence.match(regExp);

    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, word), {}, {
      distance: match === null || match === void 0 ? void 0 : match[0].length
    })]);
  }, []);
  return words;
};

exports["default"] = _default;
//# sourceMappingURL=wordsTokenizedGet.js.map