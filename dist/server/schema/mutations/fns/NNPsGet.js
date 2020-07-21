'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _natural = _interopRequireDefault(require("natural"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var wordsTag = function wordsTag(words) {
  var language = 'EN';
  var defaultCategory = 'N';
  var defaultCategoryCapitalized = 'NNP';
  var lexicon = new _natural["default"].Lexicon(language, defaultCategory, defaultCategoryCapitalized);
  var ruleSet = new _natural["default"].RuleSet(language);
  var tagger = new _natural["default"].BrillPOSTagger(lexicon, ruleSet);
  var wordsTagged = tagger.tag(words.map(function (word) {
    return word.text;
  })).taggedWords.reduce(function (memo, wordtagged, index) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, wordtagged), words[index])]);
  }, []);
  return wordsTagged;
};

var wordsChunk = function wordsChunk(words) {
  var wordsChunked = words.reduce(function (memo, word) {
    var _word = memo.slice(-1)[0];

    switch (true) {
      case !_word:
        return [].concat((0, _toConsumableArray2["default"])(memo), [word]);

      case _word.tag === 'NNP' && word.tag === 'NNP':
      case _word.tag === 'NNP' && !!word.text.match(/^[A-Z]/):
      case word.tag === 'NNP' && !!_word.text.match(/^[A-Z]/) && !!_word.index:
        return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, -1)), [_objectSpread(_objectSpread({}, _word), {}, {
          text: "\n                ".concat(_word.text, " ").concat(word.text, "\n              ").trim(),
          tag: 'NNP'
        })]);

      case word.tag === 'FW':
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, word), {}, {
          tag: 'NNP'
        })]);

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [word]);
    }
  }, []);
  return wordsChunked;
};

var NNPsGetFn = function NNPsGetFn(words) {
  return words.reduce(function (memo, word) {
    switch (true) {
      case word.tag === 'NNP':
        return [].concat((0, _toConsumableArray2["default"])(memo), [word.text]);

      default:
        return memo;
    }
  }, []);
};

var _default = function _default(sentence) {
  var words = (0, _wordsTokenizedGet["default"])(sentence);
  words = wordsTag(words);
  words = wordsChunk(words);
  words = NNPsGetFn(words);
  return words;
};

exports["default"] = _default;
//# sourceMappingURL=NNPsGet.js.map