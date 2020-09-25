'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _natural = _interopRequireDefault(require("natural"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(words) {
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

exports["default"] = _default;
//# sourceMappingURL=wordsTaggedGet.js.map