'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _sbd = _interopRequireDefault(require("sbd"));

var sentenceMaxLength = 100;
var sentenceNormalizeRegExp = /,\s/;

var sentenceNormalizedGetFn = function sentenceNormalizedGetFn(text) {
  var joinString = ', ';
  return text.split(sentenceNormalizeRegExp).reduce(function (memo, _text) {
    switch (true) {
      case !memo.length:
        return [_text];

      case memo.length < 2 && memo[0].length + _text.length + +joinString.length < sentenceMaxLength:
        return ["\n                ".concat(memo[0].trim()).concat(joinString).concat(_text.trim(), "\n              ").trim()];

      case memo.length < 2:
        return [memo[0], _text.trim()];

      default:
        return [memo[0], "\n                ".concat(memo[1].trim()).concat(joinString).concat(_text.trim(), "\n              ").trim()];
    }
  }, []);
};

var sentenceNormalizedGet = function sentenceNormalizedGet(text) {
  var texts = [text];

  while (texts[texts.length - 1].length > sentenceMaxLength && !!texts[texts.length - 1].match(sentenceNormalizeRegExp)) {
    var sentenceNormalized = sentenceNormalizedGetFn(texts[texts.length - 1]);
    texts = [].concat((0, _toConsumableArray2["default"])(texts.slice(0, -1)), (0, _toConsumableArray2["default"])(sentenceNormalized));
  }

  texts = texts.reduce(function (memo, text, index) {
    if (index < texts.length - 1) {
      return [].concat((0, _toConsumableArray2["default"])(memo), ["\n            ".concat(text, " ...,\n          ").trim()]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [text]);
  }, []);
  return texts;
};

var sentencesGetFn = function sentencesGetFn(paragraph, paragraphIndex) {
  var sentences = _sbd["default"].sentences(paragraph);

  sentences = sentences.reduce(function (memo, text) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(sentenceNormalizedGet(text)));
  }, []).map(function (text, sentenceIndex) {
    return {
      text: text,
      paragraphIndex: paragraphIndex,
      sentenceIndex: sentenceIndex
    };
  });
  return sentences;
};

var _default = function _default(paragraphs) {
  var sentences = paragraphs.reduce(function (memo, paragraph, paragraphIndex) {
    var _sentences = sentencesGetFn(paragraph, paragraphIndex);

    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(_sentences));
  }, []);
  sentences = sentences && sentences.reduce(function (memo, sentence) {
    if (memo.length >= 5 && !memo[memo.length - 1].text.match(/\s...,$/)) {
      return memo;
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
  }, []);
  return sentences;
};

exports["default"] = _default;
//# sourceMappingURL=sentencesGet.js.map