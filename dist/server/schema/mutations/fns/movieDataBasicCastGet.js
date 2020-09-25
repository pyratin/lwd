'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _sentencesTokenizedGet = _interopRequireDefault(require("./sentencesTokenizedGet"));

var castLinesGet = function castLinesGet(_castText) {
  var $ = _cheerio["default"].load(_castText, {
    decodeEntities: false
  });

  return $('li').toArray().map(function (_el) {
    var el = $(_el).find('span.mw-reflink-text').remove().end();
    return [$(el).text(), $(el).html()];
  });
};

var actorLinkMatchedGet = function actorLinkMatchedGet(castLine) {
  var castHtml = castLine[1];
  var actorLinkRegExp = /^<a href="\/wiki\/([^"]*?)"[^>]*?>([^<]*?)<\/a>/;
  var match = castHtml.match(actorLinkRegExp);
  return match ? {
    text: match[2],
    ud: match[1]
  } : null;
};

var actorNNPMatchedGet = function actorNNPMatchedGet(castLine) {
  var castText = castLine[0];
  var NNPs = (0, _NNPsGet["default"])(castText);
  var match = NNPs.find(function (_ref) {
    var distance = _ref.distance;
    return distance === 0;
  });
  return match ? {
    text: match.text,
    ud: null
  } : null;
};

var actorSyntaxMatchedGet = function actorSyntaxMatchedGet(castLine) {
  var castText = castLine[0];
  var syntaxRegExp = /(.*)\sas\s/;
  var match = castText.match(syntaxRegExp);
  return match ? {
    text: match[1],
    ud: null
  } : null;
};

var actorsGetFn = function actorsGetFn(castLine) {
  var actor;

  switch (true) {
    case (actor = actorLinkMatchedGet(castLine)) && !!actor:
    case (actor = actorNNPMatchedGet(castLine)) && !!actor:
    case (actor = actorSyntaxMatchedGet(castLine)) && !!actor:
      return actor;
  }
};

var actorsGet = function actorsGet(castLines) {
  return castLines.reduce(function (memo, castLine) {
    var actor = actorsGetFn(castLine);

    if (actor) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [actor]);
    }

    return memo;
  }, []);
};

var actorsCleanedGet = function actorsCleanedGet(actors) {
  return actors.map(function (actor) {
    delete actor.index;
    delete actor.distance;
    delete actor.tokenIndex;
    return actor;
  });
};

var actorRegExpGet = function actorRegExpGet(actorText) {
  return new RegExp("\n      ^".concat(actorText, "\n    ").trim(), 'm');
};

var castGetFn = function castGetFn(actors, castLines) {
  var castText = castLines.reduce(function (memo, _ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 1),
        _castText = _ref3[0];

    return [].concat((0, _toConsumableArray2["default"])(memo), [_castText]);
  }, []).join('\n');
  var cast = actors.reduce(function (memo, actor, index) {
    var _castText$split;

    var role = (_castText$split = castText.split(actorRegExpGet(actor.text))) === null || _castText$split === void 0 ? void 0 : _castText$split[1];

    if (actors.length > index + 1 && role) {
      var _role$split;

      role = (_role$split = role.split(actorRegExpGet(actors[index + 1].text))) === null || _role$split === void 0 ? void 0 : _role$split[0];
    }

    role = role ? role : '';
    role = role.replace(/\n/g, ' ');
    role = role.trim() ? (0, _sentencesTokenizedGet["default"])(role)[0] : role;
    role = role.trim() ? role.split(/[:,]/)[0] : role;
    role = "\n        ".concat(actor.text, " ").concat(role.trim(), "\n      ").trim();

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

var _default = function _default(castText) {
  if (!castText) {
    return null;
  }

  var castLines = castLinesGet(castText);
  var actors = actorsGet(castLines);
  actors = actorsCleanedGet(actors);
  var cast = castGetFn(actors, castLines);
  return cast;
};

exports["default"] = _default;
//# sourceMappingURL=movieDataBasicCastGet.js.map