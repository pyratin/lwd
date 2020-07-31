'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _sbd = _interopRequireDefault(require("sbd"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actorGet = function actorGet(_ref, actors) {
  var actorUd = _ref.ud;
  return actors.find(function (_ref2) {
    var _actorUd = _ref2.ud;
    return _actorUd === actorUd;
  });
};

var actorsUniqueGet = function actorsUniqueGet(characters) {
  return characters.reduce(function (memo, _ref3) {
    var actor = _ref3.actor;

    if (!actorGet(actor, memo)) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [actor]);
    }

    return memo;
  }, []);
};

var queryGet = function queryGet(actorUd) {
  return "\n    https://en.wikipedia.org/api/rest_v1/page/mobile-sections-lead/".concat(actorUd, "\n  ").trim();
};

var actorsGenderAssignedGetFn = function actorsGenderAssignedGetFn(actorUd) {
  return (0, _mediawikiFetch["default"])(queryGet(encodeURIComponent(actorUd))).then(function (res) {
    var sectionLeadText = res.sections[0].text;

    var $ = _cheerio["default"].load(sectionLeadText);

    var _$$toArray$map = $('p').toArray().map(function (el) {
      return $(el).text();
    }),
        _$$toArray$map2 = (0, _slicedToArray2["default"])(_$$toArray$map, 1),
        paragraphLead = _$$toArray$map2[0];

    var sentenceLead = _sbd["default"].sentences(paragraphLead)[0];

    switch (true) {
      case !!sentenceLead.match(/(actor|comedian)/):
        return 'man';

      case !!sentenceLead.match(/actress/):
        return 'woman';

      default:
        return 'unknown';
    }
  });
};

var actorsGenderAssignedGet = function actorsGenderAssignedGet(actors) {
  return actors.reduce(function (memo, actor) {
    return memo.then(function (res) {
      if (actor.ud) {
        return actorsGenderAssignedGetFn(actor.ud).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, actor), {}, {
            gender: result
          })]);
        });
      }

      return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, actor), {}, {
        gender: 'unknown'
      })]);
    });
  }, Promise.resolve([]));
};

var charactersActorGenderAssignedGetFn = function charactersActorGenderAssignedGetFn(character, actors) {
  var actor = actorGet(character.actor, actors);
  return _objectSpread(_objectSpread({}, character), {}, {
    actor: _objectSpread(_objectSpread({}, character.actor), {}, {
      gender: actor.gender
    })
  });
};

var charactersActorGenderAssignedGet = function charactersActorGenderAssignedGet(characters, actors) {
  return characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [charactersActorGenderAssignedGetFn(character, actors)]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_characters) {
    var actors, characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actors = actorsUniqueGet(_characters);
            _context.next = 3;
            return actorsGenderAssignedGet(actors);

          case 3:
            actors = _context.sent;
            characters = charactersActorGenderAssignedGet(_characters, actors);
            return _context.abrupt("return", characters);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersActorGenderAssignedGet.js.map