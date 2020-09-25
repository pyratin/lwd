'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _sentencesTokenizedGet = _interopRequireDefault(require("./sentencesTokenizedGet"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

var _wordsTaggedGet = _interopRequireDefault(require("./wordsTaggedGet"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _parenthesisPurgedGet = _interopRequireDefault(require("./parenthesisPurgedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var sentenceNormalizeRegExp = /,\s/;

var sentenceIsNormalizedGet = function sentenceIsNormalizedGet(sentence, sentenceMaxLength) {
  return !!sentence.match(sentenceNormalizeRegExp) && !!sentence.split(sentenceNormalizeRegExp).reduce(function (memo, _sentence) {
    if (memo && _sentence.length > sentenceMaxLength) {
      return false;
    }

    return memo;
  }, true);
};

var wordPOSMatchConditionGet = function wordPOSMatchConditionGet(word, sentence, tagType, sentenceMaxLength) {
  if (sentenceIsNormalizedGet(sentence, sentenceMaxLength)) {
    return false;
  }

  switch (tagType) {
    case 'CC':
      return word.tag === 'CC';

    case 'VBG':
      return word.tag === 'VBG' && !!word.text.match(/ing$/) && !word.text.match(/^king$/i);
  }
};

var wordPOSMatchedGet = function wordPOSMatchedGet(word, sentence, tagType, sentenceMaxLength) {
  var caseCondition = wordPOSMatchConditionGet(word, sentence, tagType, sentenceMaxLength);

  switch (true) {
    case caseCondition:
      return word;

    default:
      return null;
  }
};

var wordsPosMatchedGet = function wordsPosMatchedGet(words, sentence, tagType, sentenceMaxLength) {
  return words.reduce(function (memo, _word) {
    var word = wordPOSMatchedGet(_word, sentence, tagType, sentenceMaxLength);

    if (word) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [word]);
    }

    return memo;
  }, []);
};

var sentenceShortenedByPOSGet = function sentenceShortenedByPOSGet(_sentence, tagType, sentenceMaxLength) {
  if (sentenceIsNormalizedGet(_sentence, sentenceMaxLength)) {
    return _sentence;
  }

  var words = (0, _wordsTokenizedGet["default"])(_sentence);
  words = (0, _wordsTaggedGet["default"])(words);
  words = wordsPosMatchedGet(words, _sentence, tagType, sentenceMaxLength);
  var sentence = words.reduce(function (memo, word) {
    var _distance = word.distance;
    var distanceOffset = memo.length - _sentence.length;
    var distance = _distance + distanceOffset;
    return [memo.slice(0, distance).trim(), ", ".concat(word.text, " "), memo.slice(distance + word.text.length).trim()].join('');
  }, _sentence);
  return sentence;
};

var NNPsSortedGet = function NNPsSortedGet(NNPs, sentenceMaxLength) {
  return NNPs.sort(function (a, b) {
    var factor = sentenceMaxLength / 2;

    switch (true) {
      case Math.abs(a.distance - factor) > Math.abs(b.distance - factor):
        return 1;

      case Math.abs(b.distance - factor) > Math.abs(a.distance - factor):
        return -1;
    }
  });
};

var sentenceShortenedByNNPGet = function sentenceShortenedByNNPGet(_sentence, sentenceMaxLength) {
  var _NNPsSortedGet;

  if (sentenceIsNormalizedGet(_sentence, sentenceMaxLength)) {
    return _sentence;
  }

  var NNPs = (0, _NNPsGet["default"])(_sentence);
  NNPs = NNPs.map(function (NNP) {
    var wordBoundry = !!_sentence.match(new RegExp("\n            ".concat(NNP.text, "\\s\n          ").trim()));
    var end = !_sentence.match(new RegExp("\n            ".concat(NNP.text, "\\s[A-Z]\n          ").trim()));
    return _objectSpread(_objectSpread({}, NNP), {}, {
      wordBoundry: wordBoundry,
      end: end
    });
  });
  NNPs = NNPs.filter(function (NNP) {
    return NNP.wordBoundry && NNP.end;
  });
  NNPs = NNPs.filter(function (NNP) {
    return _sentence.length !== NNP.distance + NNP.text.length + 1;
  });
  var NNP = (_NNPsSortedGet = NNPsSortedGet(NNPs, sentenceMaxLength)) === null || _NNPsSortedGet === void 0 ? void 0 : _NNPsSortedGet[0];
  var sentence = NNP ? [_sentence.slice(0, NNP.distance).trim(), " ".concat(NNP.text, ", "), _sentence.slice(NNP.distance + NNP.text.length).trim()].join('') : _sentence;
  return sentence;
};

var sentenceShortenedGetFn = function sentenceShortenedGetFn(_sentence, sentenceMaxLength) {
  var sentence = _sentence.replace(/\swhich(\s)/g, ', which$1');

  sentence = sentenceShortenedByPOSGet(sentence, 'CC', sentenceMaxLength);
  sentence = sentenceShortenedByPOSGet(sentence, 'VBG', sentenceMaxLength);
  sentence = sentenceShortenedByNNPGet(sentence, sentenceMaxLength);
  return sentence;
};

var sentenceShortenedGet = function sentenceShortenedGet(_sentence, sentenceMaxLength) {
  var sentence = _sentence.split(sentenceNormalizeRegExp).reduce(function (memo, __sentence) {
    var sentence = __sentence.trim();

    if (sentence.length > sentenceMaxLength && !sentenceIsNormalizedGet(sentence, sentenceMaxLength)) {
      sentence = sentenceShortenedGetFn(sentence, sentenceMaxLength);
      return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
  }, []).join(', ');

  return sentence;
};

var sentenceParenthesisHandle = function sentenceParenthesisHandle(_sentence) {
  var sentence = (0, _parenthesisPurgedGet["default"])(_sentence);
  return sentence;
};

var sentencesPreprocessedGetFn = function sentencesPreprocessedGetFn(_sentence, sentenceMaxLength) {
  var sentence = sentenceShortenedGet(_sentence, sentenceMaxLength);
  sentence = sentenceParenthesisHandle(sentence);
  return sentence;
};

var sentencesPreprocessedGet = function sentencesPreprocessedGet(sentences, sentenceMaxLength) {
  return sentences.reduce(function (memo, _sentence) {
    var sentence = sentencesPreprocessedGetFn(_sentence, sentenceMaxLength);

    if (sentence.trim()) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
    }

    return memo;
  }, []);
};

var _sentenceNormalizedGetFn = function _sentenceNormalizedGetFn(sentence) {
  var commas = (0, _toConsumableArray2["default"])(sentence.matchAll(new RegExp(sentenceNormalizeRegExp, 'g'))).reduce(function (memo, _ref) {
    var index = _ref.index;
    var fragments = [sentence.slice(0, index), sentence.slice(index + 1)];
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      distance: index,
      effect: Math.abs(fragments[0].length - fragments[1].length)
    }]);
  }, []);
  commas = commas.sort(function (a, b) {
    switch (true) {
      case a.effect > b.effect:
        return 1;

      case b.effect > a.effect:
        return -1;
    }
  });
  var comma = commas[0];
  var fragments = [sentence.slice(0, comma.distance).trim(), sentence.slice(comma.distance + 1).trim()];
  return fragments;
};

var sentenceNormalizedGetFn = function sentenceNormalizedGetFn(text, sentenceMaxLength) {
  var joinString = ', ';
  return _sentenceNormalizedGetFn(text).reduce(function (memo, _text) {
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

var sentenceNormalizedGet = function sentenceNormalizedGet(text, sentenceMaxLength) {
  var texts = [text];

  while (texts[texts.length - 1].length > sentenceMaxLength && !!texts[texts.length - 1].match(sentenceNormalizeRegExp)) {
    var sentenceNormalized = sentenceNormalizedGetFn(texts[texts.length - 1], sentenceMaxLength);
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

var _default = function _default(paragraph, sentenceMaxLength) {
  var sentences = (0, _sentencesTokenizedGet["default"])(paragraph);
  sentences = sentencesPreprocessedGet(sentences, sentenceMaxLength);
  sentences = sentences.reduce(function (memo, text) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(sentenceNormalizedGet(text, sentenceMaxLength)));
  }, []);
  return sentences;
};

exports["default"] = _default;
//# sourceMappingURL=sentencesGet.js.map