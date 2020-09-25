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

var _charactersMetaRoleVillainAssignedGet = _interopRequireDefault(require("./charactersMetaRoleVillainAssignedGet"));

var _NNPCrossMatchesGet = _interopRequireDefault(require("./NNPCrossMatchesGet"));

var _charactersSortedByStarringIndexGet = _interopRequireDefault(require("./charactersSortedByStarringIndexGet"));

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

var roleExistsGet = function roleExistsGet(character, characters) {
  var NNP = {
    text: character.text,
    index: 0
  };

  var _NNPs = _NNPsGet(characters);

  var matches = (0, _NNPCrossMatchesGet["default"])(NNP, _NNPs);
  return matches === null || matches === void 0 ? void 0 : matches[0];
};

var charactersRoleMatchIndexAssignedGet = function charactersRoleMatchIndexAssignedGet(characters) {
  return characters.reduce(function (memo, character) {
    var match = roleExistsGet(character, memo);
    var roleMatchIndex = match && memo[match._NNPIndex].castIndex === character.castIndex && memo[match._NNPIndex].roleMatchIndex === -1 ? memo[match._NNPIndex].starringIndex : -1;
    var dualRoleIndex = !match ? memo.findIndex(function (_memo) {
      return _memo.dualRoleIndex === -1 && _memo.castIndex === character.castIndex;
    }) : -1;
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      roleMatchIndex: roleMatchIndex,
      dualRoleIndex: dualRoleIndex
    })]);
  }, []);
};

var characterGroupsGet = function characterGroupsGet(characters) {
  var characterGroups = characters.reduce(function (memo, character) {
    var roleMatchIndex = character.roleMatchIndex;

    if (roleMatchIndex >= 0) {
      return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, roleMatchIndex)), [[].concat((0, _toConsumableArray2["default"])(memo[roleMatchIndex]), [character])], (0, _toConsumableArray2["default"])(memo.slice(roleMatchIndex + 1)), [null]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [[character]]);
  }, []);
  characterGroups = characterGroups.filter(function (characterGroup) {
    return characterGroup;
  });
  return characterGroups;
};

var characterGroupsSortedByCastIndexGet = function characterGroupsSortedByCastIndexGet(characterGroups) {
  return characterGroups.sort(function (a, b) {
    switch (true) {
      case a[0].castIndex > b[0].castIndex:
        return 1;

      case b[0].castIndex > a[0].castIndex:
        return -1;
    }
  });
};

var characterGroupsOrderedGet = function characterGroupsOrderedGet(_characterGroups) {
  var characterGroups = characterGroupsSortedByCastIndexGet(_characterGroups);
  var heroGroups = characterGroups.reduce(function (memo, characterGroup) {
    var match = characterGroup.find(function (character) {
      return !character.castIndex && character.actor.gender === 'man';
    });

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'hero'
        });
      })]);
    }

    return memo;
  }, []);
  var heroineGroups = characterGroups.reduce(function (memo, characterGroup) {
    if (!memo.length && characterGroup[0].actor.gender === 'woman') {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'heroine'
        });
      })]);
    }

    return memo;
  }, []);
  var villainGroups = characterGroups.reduce(function (memo, characterGroup) {
    var match = characterGroup.find(function (character) {
      return character.role === 'villain';
    });

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'villain'
        });
      })]);
    }

    return memo;
  }, []);
  var otherGroups = characterGroups.filter(function (characterGroup) {
    var _heroGroups$, _heroGroups$$, _heroineGroups$, _heroineGroups$$, _villainGroups$, _villainGroups$$;

    var characterGroupCastIndex = characterGroup[0].castIndex;
    var heroCastIndex = (_heroGroups$ = heroGroups[0]) === null || _heroGroups$ === void 0 ? void 0 : (_heroGroups$$ = _heroGroups$[0]) === null || _heroGroups$$ === void 0 ? void 0 : _heroGroups$$.castIndex;
    var heroineCastIndex = (_heroineGroups$ = heroineGroups[0]) === null || _heroineGroups$ === void 0 ? void 0 : (_heroineGroups$$ = _heroineGroups$[0]) === null || _heroineGroups$$ === void 0 ? void 0 : _heroineGroups$$.castIndex;
    var villainCastIndex = (_villainGroups$ = villainGroups[0]) === null || _villainGroups$ === void 0 ? void 0 : (_villainGroups$$ = _villainGroups$[0]) === null || _villainGroups$$ === void 0 ? void 0 : _villainGroups$$.castIndex;
    return characterGroupCastIndex !== heroCastIndex && characterGroupCastIndex !== heroineCastIndex && characterGroupCastIndex !== villainCastIndex;
  });
  var manGroups = otherGroups.reduce(function (memo, characterGroup) {
    var match = characterGroup.find(function (character) {
      return character.actor.gender === 'man';
    });

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'man'
        });
      })]);
    }

    return memo;
  }, []);
  var womanGroups = otherGroups.reduce(function (memo, characterGroup) {
    var match = characterGroup.find(function (character) {
      return character.actor.gender === 'woman';
    });

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'woman'
        });
      })]);
    }

    return memo;
  }, []);
  var unknownGroups = otherGroups.reduce(function (memo, characterGroup) {
    var match = characterGroup.find(function (character) {
      return character.actor.gender === 'unknown';
    });

    if (match) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [characterGroup.map(function (character) {
        return _objectSpread(_objectSpread({}, character), {}, {
          role: 'unknown'
        });
      })]);
    }

    return memo;
  }, []);
  return [heroGroups, heroineGroups, villainGroups, manGroups, womanGroups, unknownGroups];
};

var charactersGet = function charactersGet(characterGroups) {
  return characterGroups.reduce(function (memo, _characterGroups) {
    var characters = _characterGroups.reduce(function (memo, characterGroup, roleGroupIndex) {
      return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(characterGroup.reduce(function (memo, character) {
        return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
          roleGroupIndex: roleGroupIndex
        })]);
      }, [])));
    }, []);

    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(characters));
  }, []);
};

var charactersRoleAssignedGet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_characters, title) {
    var characters, characterGroups;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _charactersMetaRoleVillainAssignedGet["default"])(_characters, title);

          case 2:
            characters = _context.sent;
            characterGroups = characterGroupsGet(characters);
            characterGroups = characterGroupsOrderedGet(characterGroups);
            characters = charactersGet(characterGroups);
            characters = (0, _charactersSortedByStarringIndexGet["default"])(characters);
            return _context.abrupt("return", characters);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function charactersRoleAssignedGet(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_characters, title) {
    var characters;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            characters = charactersRoleMatchIndexAssignedGet(_characters);
            _context2.next = 3;
            return charactersRoleAssignedGet(characters, title);

          case 3:
            characters = _context2.sent;
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
//# sourceMappingURL=charactersMetaRoleAssignedGet.js.map