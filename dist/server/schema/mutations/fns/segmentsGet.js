'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __fragmentsGetFn = function __fragmentsGetFn(fragment, character) {
  return fragment.text.split(character.text).reduce(function (memo, text) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, fragment), {}, {
      text: text
    })]);
  }, []).reduce(function (memo, fragment, index) {
    var textFragment = _objectSpread({
      type: 'text'
    }, fragment);

    if (index) {
      var actorFragment = _objectSpread(_objectSpread({}, fragment), {}, {
        type: 'actor',
        actor: character.actor,
        text: character.text,
        castIndex: character.castIndex
      });

      return [].concat((0, _toConsumableArray2["default"])(memo), [actorFragment, textFragment]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [textFragment]);
  }, []);
};

var _fragmentsGetFn = function _fragmentsGetFn(fragments, character) {
  return fragments.reduce(function (memo, fragment) {
    if (fragment.type !== 'actor') {
      return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(__fragmentsGetFn(fragment, character)));
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [fragment]);
  }, []);
};

var fragmentsGetFn = function fragmentsGetFn(sentence, characters) {
  return characters.reduce(function (memo, character) {
    var fragments = _fragmentsGetFn(memo, character).reduce(function (fragmentMemo, fragment, fragmentIndex) {
      return [].concat((0, _toConsumableArray2["default"])(fragmentMemo), [_objectSpread(_objectSpread({}, fragment), {}, {
        fragmentIndex: fragmentIndex
      })]);
    }, []);

    return fragments;
  }, [sentence]);
};

var fragmentsGet = function fragmentsGet(plot, characters) {
  return plot.reduce(function (memo, sentence, segmentIndex) {
    var fragments = fragmentsGetFn(sentence, characters).reduce(function (memo, fragment) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, fragment), {}, {
        segmentIndex: segmentIndex
      })]);
    }, []);
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(fragments));
  }, []);
};

var segmentsGetFn = function segmentsGetFn(fragments) {
  var segmentCount = fragments.slice(-1)[0].segmentIndex;
  return new Array(segmentCount + 1).fill().reduce(function (memo, _, index) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [fragments.filter(function (fragment) {
      return fragment.segmentIndex === index;
    })]);
  }, []);
};

var _default = function _default(plot, characters) {
  var fragments = fragmentsGet(plot, characters);
  var segments = segmentsGetFn(fragments);
  return segments;
};

exports["default"] = _default;
//# sourceMappingURL=segmentsGet.js.map