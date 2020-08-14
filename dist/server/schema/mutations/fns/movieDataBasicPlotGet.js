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

var _default = function _default(plotText) {
  if (!plotText) {
    return null;
  }

  var $ = _cheerio["default"].load(plotText);

  var plotEl = $('span, sup').remove().end();
  var paragraphs = plotEl.find('p').toArray();

  if (!paragraphs.length) {
    return null;
  }

  paragraphs = paragraphs.reduce(function (memo, p) {
    var paragraph = $(p).text();
    return [].concat((0, _toConsumableArray2["default"])(memo || []), [paragraph]);
  }, null);
  var sentences = sentencesGetFn(paragraphs);
  return sentences;
};

exports["default"] = _default;
//# sourceMappingURL=movieDataBasicPlotGet.js.map