'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _moment = _interopRequireDefault(require("moment"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _movieDataBasicGet = _interopRequireDefault(require("./movieDataBasicGet"));

var categoryGet = function categoryGet(_category) {
  switch (_category) {
    case 'tamil':
      return 'tamil-language_films';

    case 'hindi':
      return 'hindi-language_films';

    default:
      return 'English-language_films';
  }
};

var queryGet = function queryGet(text) {
  var _text$split = text.split(/:/),
      _text$split2 = (0, _slicedToArray2["default"])(_text$split, 2),
      _category = _text$split2[0],
      year = _text$split2[1];

  var category = categoryGet(_category);
  var cmstart = new Date((0, _moment["default"])("\n        ".concat(year, "-01-01\n      ").trim())).toISOString();
  var cmend = new Date((0, _moment["default"])(cmstart).add(1, 'year')).toISOString();
  return "\n    https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&format=json&cmlimit=500&cmsort=timestamp&cmstart=".concat(cmstart, "&cmend=").concat(cmend, "&cmtitle=Category:").concat(category, "\n  ").trim();
};

var movieTitleRandomGet = function movieTitleRandomGet(text) {
  var query = queryGet(text);
  return (0, _mediawikiFetch["default"])(query).then(function (res) {
    var categorymembers = res.query.categorymembers;
    var title = categorymembers[Math.floor(Math.random() * categorymembers.length)].title;
    return title;
  }).then( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(title) {
      var movieDataBasic;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _movieDataBasicGet["default"])(title);

            case 2:
              movieDataBasic = _context.sent;
              return _context.abrupt("return", movieDataBasic.plot && movieDataBasic.cast ? title : movieTitleRandomGet(text));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = movieTitleRandomGet;
exports["default"] = _default;
//# sourceMappingURL=movieTitleRandomGet.js.map