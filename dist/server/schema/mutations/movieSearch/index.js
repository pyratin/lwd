'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mediawikiFetch = _interopRequireDefault(require("../fns/mediawikiFetch"));

var _movieDataBasicGet = _interopRequireDefault(require("../fns/movieDataBasicGet"));

var movieSearchQueryGetFn = function movieSearchQueryGetFn(_text, fuzzy) {
  var fuzzySuffix = fuzzy ? '~' : '';

  var text = _text.split(/\s+/g).map(function (__text) {
    return "\n          ".concat(__text).concat(fuzzySuffix, "\n        ").trim();
  }).join(' ');

  text = encodeURIComponent(text);
  return text;
};

var movieSearchQueryGet = function movieSearchQueryGet(text, limit, fuzzy) {
  return "\n    https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=intitle:".concat(movieSearchQueryGetFn(text, fuzzy), "+incategory:tamil-language_films|hindi-language_films|English-language_films&srlimit=").concat(limit, "&format=json\n  ").trim();
};

var movieSearchResultsGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text, limit, fuzzy) {
    var query, json, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = movieSearchQueryGet(text, limit, fuzzy);
            _context.next = 3;
            return (0, _mediawikiFetch["default"])(query);

          case 3:
            json = _context.sent;
            results = json.query.search.map(function (_ref2) {
              var title = _ref2.title,
                  snippet = _ref2.snippet;
              return {
                title: title,
                snippet: snippet
              };
            });
            return _context.abrupt("return", results);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function movieSearchResultsGet(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var movieSearchResultCheck = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(result) {
    var _yield$movieDataBasic, cast, plot;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _movieDataBasicGet["default"])(result.title, 5);

          case 2:
            _yield$movieDataBasic = _context2.sent;
            cast = _yield$movieDataBasic.cast;
            plot = _yield$movieDataBasic.plot;
            return _context2.abrupt("return", !!cast && !!plot);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function movieSearchResultCheck(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var movieSearchResultsFilteredGet = function movieSearchResultsFilteredGet(results) {
  return results.reduce(function (memo, _result) {
    return memo.then(function (res) {
      return movieSearchResultCheck(_result).then(function (result) {
        if (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [_result]);
        }

        return res;
      });
    });
  }, Promise.resolve([]));
};

var _default = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(text) {
    var limit,
        fuzzy,
        results,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            limit = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 5;
            fuzzy = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
            _context3.next = 4;
            return movieSearchResultsGet(text, limit, fuzzy);

          case 4:
            results = _context3.sent;
            _context3.next = 7;
            return movieSearchResultsFilteredGet(results);

          case 7:
            results = _context3.sent;
            return _context3.abrupt("return", results);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=index.js.map