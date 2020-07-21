'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _sbd = _interopRequireDefault(require("sbd"));

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var sentenceMaxLength = 100;
var sentenceNormalizeRegExp = /\W\s/;

var titleEncodedGet = function titleEncodedGet(title) {
  return encodeURIComponent(title);
};

var pageMobileSectionQueryGet = function pageMobileSectionQueryGet(title) {
  return "\n    https://en.wikipedia.org/api/rest_v1/page/mobile-sections/".concat(titleEncodedGet(title), "\n  ").trim();
};

var moviePageSectionTextGet = function moviePageSectionTextGet(json, anchorName) {
  var section = json.remaining.sections.find(function (_ref) {
    var anchor = _ref.anchor;
    return anchor === anchorName;
  });
  return section && section.text;
};

var moviePageSectionTextsGet = function moviePageSectionTextsGet(json, anchorNames) {
  return anchorNames.reduce(function (memo, anchorName) {
    var sectionText = moviePageSectionTextGet(json, anchorName);
    return [].concat((0, _toConsumableArray2["default"])(memo), [sectionText]);
  }, []);
};

var pageTitleFromUrlGet = function pageTitleFromUrlGet(url) {
  return url.split(/\//).slice(-1)[0];
};

var castGetFn = function castGetFn(_castHtml) {
  var linebreakString = '__linebreak__';

  var castHtml = _castHtml.replace(/<br>/g, linebreakString);

  var $ = _cheerio["default"].load(castHtml);

  var castEl = $('span, sup').remove().end();
  var castText = castEl.text();
  var textRegExp = new RegExp("\n      ^(.*?)\\s+(as\\s+.*)$\n    ".trim());
  var textMatch = castText.match(textRegExp);
  var actorUd;
  var actorText;
  var role;

  if (textMatch) {
    var _textMatch = (0, _slicedToArray2["default"])(textMatch, 3);

    actorText = _textMatch[1];
    role = _textMatch[2];
    role = _sbd["default"].sentences(role)[0];
    role = role.replace(new RegExp("\n          ".concat(linebreakString, ".*\n        ").trim()), '');
  }

  var htmlRegExp = /^<a/;
  var htmlMatch = castHtml.match(htmlRegExp);

  if (actorText && role && htmlMatch) {
    var actorLinkEl = $(castEl).find('a:first-child');
    actorUd = actorLinkEl.length ? pageTitleFromUrlGet(actorLinkEl.attr('href')) : null;
  }

  return [actorUd, actorText, role];
};

var castGet = function castGet(castText) {
  if (!castText) {
    return null;
  }

  var $ = _cheerio["default"].load(castText);

  var cast = $('li').toArray().reduce(function (memo, castEl) {
    var _castGetFn = castGetFn($(castEl).html()),
        _castGetFn2 = (0, _slicedToArray2["default"])(_castGetFn, 3),
        actorUd = _castGetFn2[0],
        actorText = _castGetFn2[1],
        role = _castGetFn2[2];

    if (actorText && role) {
      return [].concat((0, _toConsumableArray2["default"])(memo || []), [{
        actor: {
          ud: actorUd,
          text: actorText
        },
        role: role
      }]);
    }

    return memo;
  }, null);
  return cast;
};

var plotTextActorTextsRemove = function plotTextActorTextsRemove(plotText, cast) {
  if (!plotText || !cast) {
    return plotText;
  }

  return cast.reduce(function (memo, _cast) {
    var regExp = new RegExp("\n          \\s(\\(".concat(_cast.actor.text, "\\))\n        ").trim(), 'g');
    return memo.replace(regExp, '');
  }, plotText);
};

var plotTextActorLinksRemove = function plotTextActorLinksRemove(plotText, cast) {
  if (!plotText || !cast) {
    return plotText;
  }

  return cast.reduce(function (memo, _cast) {
    if (_cast.actor.ud) {
      var udEscaped = (0, _escapeStringRegexp["default"])(_cast.actor.ud);
      var regExp = new RegExp("\t\n            \\s\\(<a href=\"/wiki/".concat(udEscaped, "\".*?</a>\\)\t\n          ").trim(), 'g');
      return memo.replace(regExp, '');
    }

    return memo;
  }, plotText);
};

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

var plotGetFn = function plotGetFn(paragraph, paragraphIndex) {
  return _sbd["default"].sentences(paragraph).reduce(function (memo, text) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [text]);
  }, []).reduce(function (memo, text) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(sentenceNormalizedGet(text)));
  }, []).map(function (text, sentenceIndex) {
    return {
      text: text,
      paragraphIndex: paragraphIndex,
      sentenceIndex: sentenceIndex
    };
  });
};

var plotGet = function plotGet(plotText) {
  if (!plotText) {
    return null;
  }

  var $ = _cheerio["default"].load(plotText);

  var plotEl = $('span, sup').remove().end();
  var sentences = plotEl.find('p').toArray().reduce(function (memo, p, paragraphIndex) {
    var paragraph = $(p).text();

    var _sentences = plotGetFn(paragraph, paragraphIndex);

    return [].concat((0, _toConsumableArray2["default"])(memo || []), (0, _toConsumableArray2["default"])(_sentences));
  }, null);
  sentences = sentences && sentences.reduce(function (memo, sentence) {
    if (memo.length >= 5 && !memo[memo.length - 1].text.match(/\s...,$/)) {
      return memo;
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
  }, []);
  return sentences;
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(title) {
    var _json$lead, _json$lead2;

    var query, json, date, poster, anchorNames, _moviePageSectionText, _moviePageSectionText2, castText, plotText, cast, plot;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = pageMobileSectionQueryGet(title);
            _context.next = 3;
            return (0, _mediawikiFetch["default"])(query);

          case 3:
            json = _context.sent;
            date = new Date((_json$lead = json.lead) === null || _json$lead === void 0 ? void 0 : _json$lead.lastmodified);
            poster = ((_json$lead2 = json.lead) === null || _json$lead2 === void 0 ? void 0 : _json$lead2.image) ? Object.values(json.lead.image.urls)[0] : null;
            anchorNames = ['Cast', 'Plot'];
            _moviePageSectionText = moviePageSectionTextsGet(json, anchorNames), _moviePageSectionText2 = (0, _slicedToArray2["default"])(_moviePageSectionText, 2), castText = _moviePageSectionText2[0], plotText = _moviePageSectionText2[1];
            cast = castGet(castText);
            plotText = plotTextActorTextsRemove(plotText, cast);
            plotText = plotTextActorLinksRemove(plotText, cast);
            plot = plotGet(plotText);
            return _context.abrupt("return", {
              title: title,
              date: date,
              poster: poster,
              cast: cast,
              plot: plot,
              castText: castText,
              plotText: plotText
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=movieDataBasicGet.js.map