'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _spoofNamesGet = _interopRequireDefault(require("./spoofNamesGet"));

var _charactersSortedByStarringIndexGet = _interopRequireDefault(require("./charactersSortedByStarringIndexGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var spoofNameHeroGet = function spoofNameHeroGet(genre) {
  return [genre.split(/^spoof-/)[1].split('').map(function (letter, index) {
    if (!index) {
      return letter.toUpperCase();
    }

    return letter;
  }).join('')];
};

var spoofNamesShuffledGet = function spoofNamesShuffledGet(spoofNames) {
  return spoofNames.map(function (spoofName) {
    return {
      value: spoofName,
      random: Math.random()
    };
  }).sort(function (a, b) {
    switch (true) {
      case a.random > b.random:
        return 1;

      case b.random > a.random:
        return -1;
    }
  }).map(function (_ref) {
    var value = _ref.value;
    return value;
  });
};

var dualRoleSuffixGet = function dualRoleSuffixGet(index) {
  switch (index) {
    case 0:
      return '';

    case 1:
      return '-Man';

    default:
      return "\n        -Man-".concat(index + 1, "\n      ").trim();
  }
};

var spoofNamesProcessedGet = function spoofNamesProcessedGet(_spoofNames, _characterGroups) {
  var _characterGroups$, _characterGroups$$;

  var spoofNames = spoofNamesShuffledGet(_spoofNames);
  var role = _characterGroups === null || _characterGroups === void 0 ? void 0 : (_characterGroups$ = _characterGroups[0]) === null || _characterGroups$ === void 0 ? void 0 : (_characterGroups$$ = _characterGroups$[0]) === null || _characterGroups$$ === void 0 ? void 0 : _characterGroups$$.role;

  if (role === 'hero') {
    spoofNames = new Array(_characterGroups.length).fill().map(function (_, index) {
      return "\n            ".concat(spoofNames[0]).concat(dualRoleSuffixGet(index), "\n          ").trim();
    });
  }

  return spoofNames;
};

var characterGroupsSpoofNameAssignedGetFn = function characterGroupsSpoofNameAssignedGetFn(_characterGroups, _spoofNames) {
  var spoofNames = spoofNamesProcessedGet(_spoofNames, _characterGroups);

  var characterGroups = _characterGroups.reduce(function (memo, characterGroup) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.reduce(function (memo, character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
        text: spoofNames[character.roleGroupIndex],
        _text: character.text
      })]);
    }, [])]);
  }, []);

  return characterGroups;
};

var characterGroupsSpoofNameAssignedGet = function characterGroupsSpoofNameAssignedGet(_characterGroups, spoofNames, genre) {
  var heroGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[0], spoofNameHeroGet(genre));
  var heroineGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[1], spoofNames.heroine);
  var villainGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[2], spoofNames.villain);
  var manGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[3], spoofNames.man);
  var womanGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[4], spoofNames.woman);
  var unknownGroups = characterGroupsSpoofNameAssignedGetFn(_characterGroups[5], spoofNames.unknown);
  var characterGroups = [heroGroups, heroineGroups, villainGroups, manGroups, womanGroups, unknownGroups];
  return characterGroups;
};

var charactersGet = function charactersGet(characterGroups) {
  return characterGroups.reduce(function (memo, _characterGroups) {
    var characters = _characterGroups.reduce(function (memo, characterGroup) {
      return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(characterGroup.reduce(function (memo, character) {
        return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
      }, [])));
    }, []);

    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(characters));
  }, []);
};

var characterGroupsGet = function characterGroupsGet(_characters) {
  return ['hero', 'heroine', 'villain', 'man', 'woman', 'unknown'].reduce(function (memo, role) {
    var characters = _characters.filter(function (character) {
      return character.role === role;
    });

    var characterSubGroups = characters.reduce(function (memo, character) {
      var index = character.roleGroupIndex;
      return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, index)), [[].concat((0, _toConsumableArray2["default"])(memo[index] || []), [character])], (0, _toConsumableArray2["default"])(memo.slice(index + 1)));
    }, []);
    return [].concat((0, _toConsumableArray2["default"])(memo), [characterSubGroups]);
  }, []);
};

var _default = function _default(_characters, genre) {
  var characterGroups = characterGroupsGet(_characters);
  var spoofNames = (0, _spoofNamesGet["default"])();
  characterGroups = characterGroupsSpoofNameAssignedGet(characterGroups, spoofNames, genre);
  var characters = charactersGet(characterGroups);
  characters = (0, _charactersSortedByStarringIndexGet["default"])(characters);
  return characters;
};

exports["default"] = _default;
//# sourceMappingURL=deckCharactersSpoofedGet.js.map