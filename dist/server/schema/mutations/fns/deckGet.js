'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _movieDataBasicGet = _interopRequireDefault(require("../fns/movieDataBasicGet"));

var _charactersGet = _interopRequireDefault(require("../fns/charactersGet"));

var _cardsGet = _interopRequireDefault(require("../fns/cardsGet"));

var _charactersMetaAssignedGet = _interopRequireDefault(require("./charactersMetaAssignedGet"));

var _charactersGenderAssignedGet = _interopRequireDefault(require("./charactersGenderAssignedGet"));

var _deckSpoofedGet = _interopRequireDefault(require("./deckSpoofedGet"));

var _deckActorImageIdsAssignedGet = _interopRequireDefault(require("./deckActorImageIdsAssignedGet"));

var _deckRenderDetailsAssignedGet = _interopRequireDefault(require("./deckRenderDetailsAssignedGet"));

var _deckGifyUrlsAssignedGet = _interopRequireDefault(require("./deckGifyUrlsAssignedGet"));

var _deckSpoofableAssignedGet = _interopRequireDefault(require("./deckSpoofableAssignedGet"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(title, genre, plotLimit, db) {
    var movieDataBasic, cards, characters, deck;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _movieDataBasicGet["default"])(title, plotLimit);

          case 2:
            movieDataBasic = _context.sent;

            if (!(!(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.plot) || !(movieDataBasic === null || movieDataBasic === void 0 ? void 0 : movieDataBasic.cast))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {});

          case 5:
            _context.next = 7;
            return (0, _charactersGet["default"])(movieDataBasic.cast, movieDataBasic.plot, movieDataBasic.plotText);

          case 7:
            characters = _context.sent;
            cards = (0, _cardsGet["default"])(movieDataBasic.plot, characters, genre, db);
            _context.next = 11;
            return (0, _charactersGenderAssignedGet["default"])(characters);

          case 11:
            characters = _context.sent;
            _context.next = 14;
            return (0, _charactersMetaAssignedGet["default"])(characters, cards, movieDataBasic.title);

          case 14:
            characters = _context.sent;
            deck = {
              splash: {
                title: movieDataBasic.title,
                poster: movieDataBasic.poster,
                characters: characters
              },
              cards: cards
            };
            deck = (0, _deckSpoofedGet["default"])(deck, genre);
            _context.next = 19;
            return (0, _deckActorImageIdsAssignedGet["default"])(deck, genre, db);

          case 19:
            deck = _context.sent;
            deck = (0, _deckRenderDetailsAssignedGet["default"])(deck);
            _context.next = 23;
            return (0, _deckGifyUrlsAssignedGet["default"])(deck);

          case 23:
            deck = _context.sent;
            deck = (0, _deckSpoofableAssignedGet["default"])(deck);
            return _context.abrupt("return", deck);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=deckGet.js.map