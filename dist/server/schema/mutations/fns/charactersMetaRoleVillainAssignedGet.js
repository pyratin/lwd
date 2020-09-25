'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _plotNNPsGet2 = _interopRequireDefault(require("./plotNNPsGet"));

var _NNPCrossMatchesGet = _interopRequireDefault(require("./NNPCrossMatchesGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _NNPsGet = function _NNPsGet(characters) {
  return characters.map(function (_ref, index) {
    var text = _ref.text;
    return {
      text: text,
      index: index
    };
  });
};

var _antagonistGetFn = function _antagonistGetFn(characters, text) {
  var _plotNNPsGet, _NNPs$matches$0$_NNPI, _matches$;

  if (!text) {
    return null;
  }

  var NNP = (_plotNNPsGet = (0, _plotNNPsGet2["default"])([{
    text: text
  }])) === null || _plotNNPsGet === void 0 ? void 0 : _plotNNPsGet[0];

  var _NNPs = _NNPsGet(characters);

  var matches = NNP ? (0, _NNPCrossMatchesGet["default"])(NNP, _NNPs) : null;
  var character = matches ? characters === null || characters === void 0 ? void 0 : characters[_NNPs === null || _NNPs === void 0 ? void 0 : (_NNPs$matches$0$_NNPI = _NNPs[matches === null || matches === void 0 ? void 0 : (_matches$ = matches[0]) === null || _matches$ === void 0 ? void 0 : _matches$._NNPIndex]) === null || _NNPs$matches$0$_NNPI === void 0 ? void 0 : _NNPs$matches$0$_NNPI.index] : null;
  return character && character.actor.gender !== 'woman' && character.castIndex ? character : null;
};

var antagonistGetFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(characters, title) {
    var browser, page, searchString, selector, text, antagonist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer["default"].launch({
              args: ['--no-sandbox']
            });

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return browser.newPage();

          case 5:
            page = _context.sent;
            _context.next = 8;
            return page["goto"]('https://google.com', {
              waitUntil: 'networkidle0'
            });

          case 8:
            searchString = "\n    ".concat(title, " antagonist\n  ").trim();
            _context.next = 11;
            return page.type('input[name=q]', searchString, {
              delay: 100
            });

          case 11:
            _context.next = 13;
            return page.evaluate(function () {
              document.querySelector('input[type="submit"]').click();
            });

          case 13:
            selector = '[aria-level="3"][role="heading"]';
            _context.next = 16;
            return page.waitForSelector(selector);

          case 16:
            _context.next = 18;
            return page.evaluate(function (selector) {
              var el = document.querySelector(selector);
              return el.innerText;
            }, selector);

          case 18:
            text = _context.sent;
            _context.next = 21;
            return browser.close();

          case 21:
            antagonist = _antagonistGetFn(characters, text);
            return _context.abrupt("return", antagonist);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function antagonistGetFn(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var antagonistGet = function antagonistGet(characters, title) {
  return antagonistGetFn(characters, title)["catch"](function () {
    return antagonistGet(characters, title);
  });
};

var charactersGet = function charactersGet(characters, antagonist) {
  return characters.reduce(function (memo, character) {
    if (character.text === (antagonist === null || antagonist === void 0 ? void 0 : antagonist.text)) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
        role: 'villain'
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_characters, title) {
    var antagonist, characters;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return antagonistGet(_characters, title);

          case 2:
            antagonist = _context2.sent;
            characters = charactersGet(_characters, antagonist);
            return _context2.abrupt("return", characters);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersMetaRoleVillainAssignedGet.js.map