'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _NNPCrossMatchGet = _interopRequireDefault(require("./NNPCrossMatchGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actorNNPsGet = function actorNNPsGet(castLines) {
  var NNPs = castLines.reduce(function (memo, castLine) {
    var NNPs = (0, _NNPsGet["default"])(castLine, true);
    var NNP = NNPs.find(function (_ref) {
      var distance = _ref.distance;
      return distance === 0;
    });

    if (NNP) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [NNP]);
    }

    return memo;
  }, []);
  return NNPs;
};

var actorsUdAssignedGet = function actorsUdAssignedGet(_actors, castHtml) {
  var actors = _actors.reduce(function (memo, actor) {
    var hrefCatchString = '[^"]*?';
    var regExpString = "\n      <a href=\"/wiki/(".concat(hrefCatchString, ")\" [^>]*?>").concat(actor.text, "</a>\n      ").trim();
    var regExp = new RegExp(regExpString);
    var match = castHtml.match(regExp);

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, actor), {}, {
        ud: match[1]
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, actor), {}, {
      ud: null
    })]);
  }, []);

  return actors;
};

var actorsFilteredGetFn = function actorsFilteredGetFn(plotCharacters, actor) {
  return plotCharacters.reduce(function (memo, plotCharacter) {
    var match = (0, _NNPCrossMatchGet["default"])(plotCharacter.text, actor.text);

    if (!memo && match) {
      return match;
    }

    return memo;
  }, null);
};

var actorsFilteredGet = function actorsFilteredGet(_actors, plot) {
  var plotCharacters = (0, _plotNNPsGet["default"])(plot);

  var actors = _actors.reduce(function (memo, actor) {
    var match = actorsFilteredGetFn(plotCharacters, actor);

    if (match && !actor.ud) {
      return memo;
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [actor]);
  }, []);

  return actors;
};

var actorsCleanedGet = function actorsCleanedGet(actors) {
  return actors.map(function (actor) {
    delete actor.index;
    delete actor.distance;
    return actor;
  });
};

var castGetFn = function castGetFn(actors, castLines) {
  var castText = castLines.join('\n');
  var cast = actors.reduce(function (memo, actor, index) {
    var _castText$split;

    var regExp = new RegExp("\n          ^".concat(actor.text, "\n        ").trim(), 'm');
    var role = (_castText$split = castText.split(regExp)) === null || _castText$split === void 0 ? void 0 : _castText$split[1];

    if (actors.length > index + 1 && role) {
      var _role$split;

      role = (_role$split = role.split(actors[index + 1].text)) === null || _role$split === void 0 ? void 0 : _role$split[0];
    }

    role = role ? role.replace(/\n/g, ' ') : null;

    if (role) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [{
        actor: actor,
        role: role
      }]);
    }

    return memo;
  }, []);
  return cast;
};

var _default = function _default(_castText, plot) {
  if (!_castText || !plot) {
    return null;
  }

  var $ = _cheerio["default"].load(_castText);

  var castLines = $('li').toArray().map(function (el) {
    return $(el).text();
  });
  var actors = actorNNPsGet(castLines);
  actors = actorsUdAssignedGet(actors, _castText);
  actors = actorsFilteredGet(actors, plot);
  actors = actorsCleanedGet(actors);
  var cast = castGetFn(actors, castLines);
  return cast;
};

exports["default"] = _default;
//# sourceMappingURL=movieDataBasicCastGet.js.map