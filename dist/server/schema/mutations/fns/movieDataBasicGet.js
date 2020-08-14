'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _movieDataBasicPlotGet = _interopRequireDefault(require("./movieDataBasicPlotGet"));

var _movieDataBasicCastGet = _interopRequireDefault(require("./movieDataBasicCastGet"));

var titleEncodedGet = function titleEncodedGet(title) {
  return encodeURIComponent(title);
};

var pageMobileSectionQueryGet = function pageMobileSectionQueryGet(title) {
  return "\n    https://en.wikipedia.org/api/rest_v1/page/mobile-sections/".concat(titleEncodedGet(title), "\n  ").trim();
};

var moviePageSectionTextsGetFn = function moviePageSectionTextsGetFn(json, anchorName) {
  var section = json.remaining.sections.find(function (_ref) {
    var anchor = _ref.anchor;
    return anchor.match(new RegExp("\n                ".concat(anchorName, "\n              ").trim(), 'i'));
  });
  return section && section.text;
};

var moviePageSectionTextsGet = function moviePageSectionTextsGet(json, anchorNames) {
  return anchorNames.reduce(function (memo, anchorName) {
    var _sectionText, _sectionText2;

    var sectionText = moviePageSectionTextsGetFn(json, anchorName);
    sectionText = (_sectionText = sectionText) === null || _sectionText === void 0 ? void 0 : _sectionText.replace(/\n/g, ' ');
    sectionText = (_sectionText2 = sectionText) === null || _sectionText2 === void 0 ? void 0 : _sectionText2.replace(/\s{2,}/g, ' ');
    return [].concat((0, _toConsumableArray2["default"])(memo), [sectionText]);
  }, []);
};

var plotCulledGet = function plotCulledGet(_plot) {
  var plot = _plot && _plot.reduce(function (memo, sentence) {
    var _memo, _memo2;

    if (memo.length >= 3 && !((_memo = memo[memo.length - 1]) === null || _memo === void 0 ? void 0 : _memo.text.match(/\s...,$/)) && (((_memo2 = memo[memo.length - 1]) === null || _memo2 === void 0 ? void 0 : _memo2.paragraphIndex) !== sentence.paragraphIndex || memo.length >= 6)) {
      return memo;
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [sentence]);
  }, []);

  return plot;
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(title) {
    var _json$lead;

    var query, json, poster, anchorNames, _moviePageSectionText, _moviePageSectionText2, castText, plotText, plot, cast;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // eslint-disable-next-line no-console
            console.log("\n      movieDataBasicCastGet: ".concat(title, "\n    ").trim());
            query = pageMobileSectionQueryGet(title);
            _context.next = 4;
            return (0, _mediawikiFetch["default"])(query);

          case 4:
            json = _context.sent;
            poster = ((_json$lead = json.lead) === null || _json$lead === void 0 ? void 0 : _json$lead.image) ? Object.values(json.lead.image.urls)[0] : null;
            anchorNames = ['Cast', 'Plot'];
            _moviePageSectionText = moviePageSectionTextsGet(json, anchorNames), _moviePageSectionText2 = (0, _slicedToArray2["default"])(_moviePageSectionText, 2), castText = _moviePageSectionText2[0], plotText = _moviePageSectionText2[1];
            plot = (0, _movieDataBasicPlotGet["default"])(plotText);
            cast = (0, _movieDataBasicCastGet["default"])(castText, plot);
            plot = plotCulledGet(plot);
            return _context.abrupt("return", {
              title: title,
              poster: poster,
              cast: cast,
              plot: plot,
              castText: castText,
              plotText: plotText
            });

          case 12:
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