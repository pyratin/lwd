'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _sentencesGet = _interopRequireDefault(require("./sentencesGet"));

var sentencesGetFn = function sentencesGetFn(paragraphs) {
  var sentences = paragraphs.reduce(function (memo, paragraph, paragraphIndex) {
    var _sentences = (0, _sentencesGet["default"])(paragraph, 100).map(function (text, sentenceIndex) {
      return {
        text: text,
        paragraphIndex: paragraphIndex,
        sentenceIndex: sentenceIndex
      };
    });

    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(_sentences));
  }, []);
  return sentences;
};

var sentencesTerminatedGet = function sentencesTerminatedGet(sentences) {
  var _sentences2;

  return !((_sentences2 = sentences[sentences.length - 1]) === null || _sentences2 === void 0 ? void 0 : _sentences2.text.match(/\s...,$/));
};

var sentencesCulledByLimitGet = function sentencesCulledByLimitGet(_sentences, plotLimit) {
  var sentences = _sentences.reduce(function (memo, _sentence) {
    switch (true) {
      case !!plotLimit && memo.length >= plotLimit && sentencesTerminatedGet(memo):
        return memo;

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [_sentence]);
    }
  }, []);

  return sentences;
};

var _default = function _default(plotText, plotLimit) {
  if (!plotText) {
    return null;
  }

  var $ = _cheerio["default"].load(plotText);

  var plotEl = $('span.mw-reflink-text, sup').remove().end();
  var paragraphs = plotEl.find('p').toArray();

  if (!paragraphs.length) {
    return null;
  }

  paragraphs = paragraphs.reduce(function (memo, p) {
    var paragraph = $(p).text();
    return [].concat((0, _toConsumableArray2["default"])(memo || []), [paragraph]);
  }, null);
  var sentences = sentencesGetFn(paragraphs);
  sentences = sentencesCulledByLimitGet(sentences, plotLimit);
  return sentences;
};

exports["default"] = _default;
//# sourceMappingURL=movieDataBasicPlotGet.js.map