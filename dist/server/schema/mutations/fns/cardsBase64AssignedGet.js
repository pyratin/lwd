'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mongodb = require("mongodb");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _actorImage = require("../../../data/actorImage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actorImageGet = function actorImageGet(actorImageId, db) {
  return (0, _actorImage.actorImageFindOne)({
    _id: new _mongodb.ObjectID(actorImageId)
  }, undefined, db).then(function (_ref) {
    var base64 = _ref.base64;
    return base64;
  });
};

var gifyImageGet = function gifyImageGet(gifyUrl) {
  return (0, _nodeFetch["default"])(gifyUrl).then(function (res) {
    return res.buffer();
  }).then(function (buffer) {
    return "\n          data:image/jpeg;base64,".concat(buffer.toString('base64'), "\n        ").trim();
  });
};

var cardsBase64AssignedGetFn = function cardsBase64AssignedGetFn(_ref2, db) {
  var actorImageId = _ref2.actorImageId,
      gifyUrl = _ref2.gifyUrl;
  return actorImageId ? actorImageGet(actorImageId, db) : gifyImageGet(gifyUrl);
};

var _default = function _default(_cards, db) {
  return _cards.reduce(function (memo, _card) {
    return memo.then(function (res) {
      return cardsBase64AssignedGetFn(_card, db).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, _card), {}, {
          base64: result
        })]);
      });
    });
  }, Promise.resolve([]));
};

exports["default"] = _default;
//# sourceMappingURL=cardsBase64AssignedGet.js.map