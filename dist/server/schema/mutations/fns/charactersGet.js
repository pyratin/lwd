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

var _leven = _interopRequireDefault(require("leven"));

var _NNPsGet = _interopRequireDefault(require("./NNPsGet"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

var _charactersCategoryAssignedGet = _interopRequireDefault(require("./charactersCategoryAssignedGet"));

var _charactersActorGenderAssignedGet = _interopRequireDefault(require("./charactersActorGenderAssignedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var plotCharactersGet = function plotCharactersGet(plot) {
  return plot.reduce(function (memo, sentence) {
    return (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])((0, _NNPsGet["default"])(sentence.text)))));
  }, []);
};

var castCharactersFlatlistGet = function castCharactersFlatlistGet(cast) {
  return cast.reduce(function (_castMemo, _cast, castIndex) {
    var castCharacters = (0, _NNPsGet["default"])(_cast.role).reduce(function (castCharacterMemo, text) {
      return [].concat((0, _toConsumableArray2["default"])(castCharacterMemo), [{
        text: text,
        castIndex: castIndex,
        roleIndex: _cast.role.match(text).index
      }]);
    }, []);
    return [].concat((0, _toConsumableArray2["default"])(_castMemo), (0, _toConsumableArray2["default"])(castCharacters));
  }, []);
};

var characterStringMatchedGet = function characterStringMatchedGet(character, _character) {
  return character === _character ? character : null;
};

var characterLevenMatchedGet = function characterLevenMatchedGet(character, _character) {
  return (0, _leven["default"])(character, _character) === 1 ? _character : null;
};

var characterTokenizedGet = function characterTokenizedGet(character) {
  return (0, _wordsTokenizedGet["default"])(character).map(function (_ref) {
    var text = _ref.text;
    return text;
  });
};

var characterFragmentMatchedGet = function characterFragmentMatchedGet(character, _character) {
  var characterTokens = characterTokenizedGet(character);
  var characterToken = characterTokens.find(function (characterToken) {
    return characterToken === _character;
  });
  return characterTokens.length > 1 && characterToken ? characterToken : null;
};

var __castCharactersGetFn = function __castCharactersGetFn(castCharacter, plotCharacter) {
  var text;

  switch (true) {
    case (text = characterStringMatchedGet(castCharacter.text, plotCharacter)) && !!text:
    case (text = characterLevenMatchedGet(castCharacter.text, plotCharacter)) && !!text:
    case (text = characterFragmentMatchedGet(castCharacter.text, plotCharacter)) && !!text:
    case (text = characterFragmentMatchedGet(plotCharacter, castCharacter.text)) && !!text:
      return _objectSpread(_objectSpread({}, castCharacter), {}, {
        text: text
      });
  }
};

var _castCharactersGetFn = function _castCharactersGetFn(_castCharacter, plotCharacters) {
  var castCharacter = plotCharacters.reduce(function (memo, plotCharacter) {
    var castCharacter = __castCharactersGetFn(_castCharacter, plotCharacter);

    if (!memo && castCharacter) {
      return castCharacter;
    }

    return memo;
  }, null);
  return castCharacter;
};

var castCharactersGetFn = function castCharactersGetFn(castCharacters, plotCharacters) {
  var castCharacter = castCharacters.reduce(function (memo, _castCharacter) {
    var castCharacter = _castCharactersGetFn(_castCharacter, plotCharacters);

    if (castCharacter) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [castCharacter]);
    }

    return memo;
  }, []);
  return castCharacter;
};

var castCharactersSortedGet = function castCharactersSortedGet(castCharacters) {
  return castCharacters.sort(function (a, b) {
    switch (true) {
      case a.roleIndex > b.roleIndex:
        return 1;

      case b.roleIndex > a.roleIndex:
        return -1;

      case a.castIndex > b.castIndex:
        return 1;

      case b.castIndex > a.castIndex:
        return -1;
    }
  });
};

var characterExistsGet = function characterExistsGet(character, characters) {
  return characters.find(function (_character) {
    return _character.text === character.text;
  });
};

var castCharactersUniqueGet = function castCharactersUniqueGet(castCharacters) {
  return castCharacters.reduce(function (memo, castCharacter) {
    if (!characterExistsGet(castCharacter, memo)) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [castCharacter]);
    }

    return memo;
  }, []);
};

var castCharactersGet = function castCharactersGet(cast, plotCharacters) {
  var castCharacters = castCharactersFlatlistGet(cast);
  castCharacters = castCharactersGetFn(castCharacters, plotCharacters);
  castCharacters = castCharactersSortedGet(castCharacters);
  castCharacters = castCharactersUniqueGet(castCharacters);
  return castCharacters;
};

var charactersCastDataAssignedGet = function charactersCastDataAssignedGet(characters, cast) {
  return characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), cast[character.castIndex])]);
  }, []).map(function (character) {
    delete character.roleIndex;
    return character;
  });
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cast, plot, plotText) {
    var plotCharacters, castCharacters, characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            plotCharacters = plotCharactersGet(plot);
            castCharacters = castCharactersGet(cast, plotCharacters);
            characters = charactersCastDataAssignedGet(castCharacters, cast);
            _context.next = 5;
            return (0, _charactersCategoryAssignedGet["default"])(characters, plotText);

          case 5:
            characters = _context.sent;
            _context.next = 8;
            return (0, _charactersActorGenderAssignedGet["default"])(characters);

          case 8:
            characters = _context.sent;
            return _context.abrupt("return", characters);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=charactersGet.js.map