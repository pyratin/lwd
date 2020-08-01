'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _movieDataBasicGet = _interopRequireDefault(require("./movieDataBasicGet"));

var _charactersBasicGet = _interopRequireDefault(require("./charactersBasicGet"));

var _segmentsGet = _interopRequireDefault(require("../fns/segmentsGet"));

var _cardsBasicGet = _interopRequireDefault(require("./cardsBasicGet"));

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

var queryGet = function queryGet(cmstart, cmend, category) {
  return "\n    https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&format=json&cmlimit=500&cmsort=timestamp&cmstart=".concat(cmstart, "&cmend=").concat(cmend, "&cmtitle=Category:").concat(category, "\n  ").trim();
};

var movieTitleRandomGetFn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
    var _categorymembers$Math;

    var categorymembers, title, movieDataBasic, characters, segments, cards, characterTexts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            categorymembers = res.query.categorymembers;
            title = (_categorymembers$Math = categorymembers[Math.floor(Math.random() * categorymembers.length)]) === null || _categorymembers$Math === void 0 ? void 0 : _categorymembers$Math.title;

            if (title) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            _context.next = 6;
            return (0, _movieDataBasicGet["default"])(title);

          case 6:
            movieDataBasic = _context.sent;

            if (!(!(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.plot) || !(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.cast))) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", null);

          case 9:
            characters = (0, _charactersBasicGet["default"])(movieDataBasic.cast, movieDataBasic.plot);
            segments = (0, _segmentsGet["default"])(movieDataBasic.plot, characters);
            cards = (0, _cardsBasicGet["default"])(segments);
            characterTexts = cards.reduce(function (memo, card) {
              if (card.character && card.character.text) {
                return (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(memo), [card.character.text])));
              }

              return memo;
            }, []); //eslint-disable-next-line

            console.log("\n      title: ".concat(title, ", cast: ").concat(!!movieDataBasic.cast, ", plot: ").concat(!!movieDataBasic.plot, ", characters: ").concat(characterTexts.length, "\n    ").trim());

            if (!(characterTexts.length < 1)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", null);

          case 16:
            return _context.abrupt("return", title);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function movieTitleRandomGetFn(_x) {
    return _ref.apply(this, arguments);
  };
}();

var movieTitleRandomGet = function movieTitleRandomGet(_category) {
  var year = 2000 + Math.floor(Math.random() * ((0, _moment["default"])().year() - 2000));
  var month = 1 + Math.floor(Math.random() * 12);
  var dateString = "\n    ".concat(year, "-").concat(month, "-01\n  ").trim();
  var cmstart = (0, _moment["default"])(new Date(dateString)).toISOString();
  var cmend = (0, _moment["default"])(cmstart).add(1, 'year').toISOString();
  var category = categoryGet(_category);
  var query = queryGet(cmstart, cmend, category);
  return (0, _mediawikiFetch["default"])(query).then( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(res) {
      var title;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return movieTitleRandomGetFn(res);

            case 2:
              title = _context2.sent;

              if (title) {
                _context2.next = 6;
                break;
              }

              // eslint-disable-next-line
              console.log("\n              movieTitleRandomGet: ".concat(year, "-").concat(month, "-01\n            ").trim());
              return _context2.abrupt("return", movieTitleRandomGet(_category));

            case 6:
              return _context2.abrupt("return", title);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var _default = movieTitleRandomGet;
exports["default"] = _default;
//# sourceMappingURL=movieTitleRandomGet.js.map