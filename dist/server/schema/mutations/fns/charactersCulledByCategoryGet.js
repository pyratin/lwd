'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _categoryWhitelistGet = _interopRequireDefault(require("./categoryWhitelistGet"));

var _categoryBlacklistGet = _interopRequireDefault(require("./categoryBlacklistGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var charactersUdAssignedGetFn = function charactersUdAssignedGetFn(plotText, character) {
  var regExp = new RegExp("\n      <a href=\"/wiki/([^\"]*)\"[^>]*>".concat(character.text, "</a>\n    ").trim(), 'g');
  var matchAll = (0, _toConsumableArray2["default"])(plotText.matchAll(regExp)).reduce(function (memo, _matchAll) {
    if (!memo && _matchAll.length) {
      return _matchAll[1];
    }

    return null;
  }, null);
  return matchAll;
};

var charactersUdAssignedGet = function charactersUdAssignedGet(characters, plotText) {
  return characters.reduce(function (memo, character) {
    return (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      ud: charactersUdAssignedGetFn(plotText, character)
    })])));
  }, []);
};

var pageCategoriesQueryGet = function pageCategoriesQueryGet(title) {
  return "\n    https://en.wikipedia.org/w/api.php?action=query&format=json&prop=categories&cllimit=500&redirects&titles=".concat(title, "\n  ");
};

var __charactersCategoryAssignedGetFn = function __charactersCategoryAssignedGetFn(categoryTitle) {
  var peopleCategoryStrings = ['female', 'male', 'woman', 'man', 'character', 'people'];
  return peopleCategoryStrings.reduce(function (memo, peopleCategoryString) {
    if (!memo && categoryTitle.match(new RegExp(peopleCategoryString, 'i'))) {
      return true;
    }

    return memo;
  }, false);
};

var _charactersCategoryAssignedGetFn = function _charactersCategoryAssignedGetFn(categoryTitles) {
  return categoryTitles.reduce(function (memo, categoryTitle) {
    if (!memo && __charactersCategoryAssignedGetFn(categoryTitle)) {
      return 'people';
    }

    return memo;
  }, null);
};

var charactersCategoryAssignedGetFn = function charactersCategoryAssignedGetFn(characterUd) {
  return (0, _mediawikiFetch["default"])(pageCategoriesQueryGet(encodeURIComponent(characterUd))).then(function (res) {
    var pageId = Object.keys(res.query.pages)[0];
    var categoryTitles = res.query.pages[pageId].categories.map(function (_ref) {
      var title = _ref.title;
      return title;
    });
    return _charactersCategoryAssignedGetFn(categoryTitles);
  });
};

var charactersCategoryAssignedGet = function charactersCategoryAssignedGet(characters) {
  return characters.reduce(function (memo, character) {
    return memo.then(function (res) {
      if (character.ud) {
        return charactersCategoryAssignedGetFn(character.ud).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, character), {}, {
            category: result ? result : null
          })]);
        });
      }

      return [].concat((0, _toConsumableArray2["default"])(res), [character]);
    });
  }, Promise.resolve([]));
};

var categoryWhitelistIsMatchGet = function categoryWhitelistIsMatchGet(character) {
  return (0, _categoryWhitelistGet["default"])().find(function (_categoryWhitelist) {
    return _categoryWhitelist === character.text;
  });
};

var categoryBlacklistIsMatchedGet = function categoryBlacklistIsMatchedGet(character) {
  return (0, _categoryBlacklistGet["default"])().find(function (_categoryBlacklist) {
    return _categoryBlacklist === character.text;
  });
};

var charactersFilteredGet = function charactersFilteredGet(characters) {
  return characters.reduce(function (memo, character) {
    switch (true) {
      case !!categoryWhitelistIsMatchGet(character):
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
          category: 'people'
        })]);

      case !!categoryBlacklistIsMatchedGet(character):
        return memo;

      case !!character.ud && !character.category:
        return memo;

      default:
        return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
    }
  }, []).map(function (character) {
    delete character.ud;
    return character;
  });
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_characters, plotText) {
    var characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            characters = charactersUdAssignedGet(_characters, plotText);
            _context.next = 3;
            return charactersCategoryAssignedGet(characters);

          case 3:
            characters = _context.sent;
            characters = charactersFilteredGet(characters);
            return _context.abrupt("return", characters);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersCulledByCategoryGet.js.map