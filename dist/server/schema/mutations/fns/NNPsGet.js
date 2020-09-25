'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

var _wordsTaggedGet = _interopRequireDefault(require("./wordsTaggedGet"));

var _NNPWhitelistGet = _interopRequireDefault(require("./NNPWhitelistGet"));

var _NNPBlacklistGet = _interopRequireDefault(require("./NNPBlacklistGet"));

var _NNPChunkedBlacklistGet = _interopRequireDefault(require("./NNPChunkedBlacklistGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NNPWhitelistIsMatchGet = function NNPWhitelistIsMatchGet(text) {
  return (0, _NNPWhitelistGet["default"])().find(function (_NNPWhitelist) {
    return _NNPWhitelist === text;
  });
};

var NNPBlacklistIsMatchGet = function NNPBlacklistIsMatchGet(text) {
  return (0, _NNPBlacklistGet["default"])().find(function (_NNPBlacklist) {
    return _NNPBlacklist === text;
  });
};

var wordsNNPOverridesAppliedGet = function wordsNNPOverridesAppliedGet(_words) {
  var words = _words.reduce(function (memo, _word) {
    switch (true) {
      case !!NNPWhitelistIsMatchGet(_word.text):
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _word), {}, {
          tag: 'NNP'
        })]);

      case !!NNPBlacklistIsMatchGet(_word.text):
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, _word), {}, {
          tag: 'blacklist'
        })]);

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [_word]);
    }
  }, []);

  return words;
};

var wordsChunkedGet = function wordsChunkedGet(words) {
  var wordsChunked = words.reduce(function (memo, word) {
    var _word = memo.slice(-1)[0];

    switch (true) {
      case !_word:
        return [].concat((0, _toConsumableArray2["default"])(memo), [word]);

      case _word.tag === 'NNP' && word.tag === 'NNP':
        return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, -1)), [_objectSpread(_objectSpread({}, _word), {}, {
          text: "\n                ".concat(_word.text, " ").concat(word.text, "\n              ").trim(),
          tag: 'NNP'
        })]);

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [word]);
    }
  }, []);
  return wordsChunked;
};

var wordsChunkedFilteredGet = function wordsChunkedFilteredGet(words) {
  return words.reduce(function (memo, word) {
    var match = (0, _NNPChunkedBlacklistGet["default"])().find(function (_NNPChunkedBlacklist) {
      return _NNPChunkedBlacklist === word.text;
    });

    if (!match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [word]);
    }

    return memo;
  }, []);
};

var NNPsGetFn = function NNPsGetFn(words) {
  return words.reduce(function (memo, word) {
    switch (true) {
      case word.tag === 'NNP':
        return [].concat((0, _toConsumableArray2["default"])(memo), [word]);

      default:
        return memo;
    }
  }, []);
};

var NNPsCleanedGet = function NNPsCleanedGet(words) {
  return words.map(function (word) {
    delete word.token;
    delete word.tag;
    return word;
  });
};

var _default = function _default(sentence) {
  var words = (0, _wordsTokenizedGet["default"])(sentence);
  words = (0, _wordsTaggedGet["default"])(words);
  words = wordsNNPOverridesAppliedGet(words);
  words = wordsChunkedGet(words);
  words = wordsChunkedFilteredGet(words);
  words = NNPsGetFn(words);
  words = NNPsCleanedGet(words);
  return words;
};

exports["default"] = _default;
//# sourceMappingURL=NNPsGet.js.map