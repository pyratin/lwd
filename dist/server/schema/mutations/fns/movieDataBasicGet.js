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

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _sentencesGet = _interopRequireDefault(require("./sentencesGet"));

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

var castGetFn = function castGetFn(castHtml) {
  var $ = _cheerio["default"].load(castHtml);

  var castEl = $('span, sup').remove().end();
  var castText = castEl.text();
  var textRegExp = new RegExp("\n      ^(.*?)\\s+((?:as|\u2014)(?:\\s|:)(\\n*.*)*)$\n    ".trim());
  var textMatch = castText.match(textRegExp);
  var actorUd;
  var actorText;
  var role;

  if (textMatch) {
    var _textMatch = (0, _slicedToArray2["default"])(textMatch, 3);

    actorText = _textMatch[1];
    role = _textMatch[2];
    role = _sbd["default"].sentences(role)[0];
    role = role.split(',')[0];
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

var plotGet = function plotGet(plotText) {
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
  var sentences = (0, _sentencesGet["default"])(paragraphs);
  return sentences;
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(title) {
    var _json$lead;

    var query, json, poster, anchorNames, _moviePageSectionText, _moviePageSectionText2, castText, plotText, cast, plot;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = pageMobileSectionQueryGet(title);
            _context.next = 3;
            return (0, _mediawikiFetch["default"])(query);

          case 3:
            json = _context.sent;
            poster = ((_json$lead = json.lead) === null || _json$lead === void 0 ? void 0 : _json$lead.image) ? Object.values(json.lead.image.urls)[0] : null;
            anchorNames = ['Cast', 'Plot'];
            _moviePageSectionText = moviePageSectionTextsGet(json, anchorNames), _moviePageSectionText2 = (0, _slicedToArray2["default"])(_moviePageSectionText, 2), castText = _moviePageSectionText2[0], plotText = _moviePageSectionText2[1];
            cast = castGet(castText);
            plot = plotGet(plotText);
            return _context.abrupt("return", {
              title: title,
              poster: poster,
              cast: cast,
              plot: plot,
              castText: castText,
              plotText: plotText
            });

          case 10:
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