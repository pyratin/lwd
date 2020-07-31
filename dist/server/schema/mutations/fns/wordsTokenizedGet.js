'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _natural = _interopRequireDefault(require("natural"));

var _default = function _default(_sentence) {
  var sentence = _sentence.replace(/\//g, ' / ');

  var tokenizer = new _natural["default"].TreebankWordTokenizer();
  var words = tokenizer.tokenize(sentence).reduce(function (memo, word, index) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      text: word,
      index: index
    }]);
  }, []);
  return words;
};

exports["default"] = _default;
//# sourceMappingURL=wordsTokenizedGet.js.map