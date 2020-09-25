'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _plotNNPsGet = _interopRequireDefault(require("./plotNNPsGet"));

var _castNNPsGet = _interopRequireDefault(require("./castNNPsGet"));

var _NNPsCrossMatchesGet = _interopRequireDefault(require("./NNPsCrossMatchesGet"));

var _charactersCulledByCategoryGet = _interopRequireDefault(require("./charactersCulledByCategoryGet"));

var matchesDataAssignedGet = function matchesDataAssignedGet(matches, _NNPs, __NNPs) {
  return matches.reduce(function (memo, _cross) {
    var NNP = _NNPs[_cross.NNPIndex];
    var _NNP = __NNPs[_cross._NNPIndex];
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      _cross: _cross,
      NNP: NNP,
      _NNP: _NNP
    }]);
  }, []);
};

var matchesSortedGet = function matchesSortedGet(matches) {
  return matches.sort(function (a, b) {
    switch (true) {
      case a._NNP.possessive && !b._NNP.possessive:
        return 1;

      case b._NNP.possessive && !a._NNP.possessive:
        return -1;

      case a._NNP._distance > b._NNP._distance:
        return 1;

      case b._NNP._distance > a._NNP._distance:
        return -1;

      case a._cross.NNPmatchIndex > b._cross.NNPmatchIndex:
        return 1;

      case b._cross.NNPmatchIndex > a._cross.NNPmatchIndex:
        return -1;

      case a._NNP.castIndex > b._NNP.castIndex:
        return 1;

      case b._NNP.castIndex > a._NNP.castIndex:
        return -1;
    }
  });
};

var matchExistsGet = function matchExistsGet(match, _matches) {
  return _matches.find(function (_match) {
    var matchText = match._cross.text;
    var _matchText = _match._cross.text;
    return _matchText === matchText;
  });
};

var matchesUniqueGet = function matchesUniqueGet(matches) {
  return matches.reduce(function (memo, match) {
    var exists = matchExistsGet(match, memo);

    if (!exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [match]);
    }

    return memo;
  }, []);
};

var charactersGet = function charactersGet(matches, cast) {
  return matches.reduce(function (memo, _ref) {
    var text = _ref._cross.text,
        castIndex = _ref._NNP.castIndex;
    var character = {
      text: text,
      actor: cast[castIndex].actor,
      castIndex: castIndex
    };
    return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cast, plot, plotText) {
    var NNPs, _NNPs, matches, characters;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            NNPs = (0, _plotNNPsGet["default"])(plot);
            _NNPs = (0, _castNNPsGet["default"])(cast);
            matches = (0, _NNPsCrossMatchesGet["default"])(NNPs, _NNPs, false);
            matches = matchesDataAssignedGet(matches, NNPs, _NNPs);
            matches = matchesSortedGet(matches);
            matches = matchesUniqueGet(matches);
            characters = charactersGet(matches, cast);
            _context.next = 9;
            return (0, _charactersCulledByCategoryGet["default"])(characters, plotText);

          case 9:
            characters = _context.sent;
            return _context.abrupt("return", characters);

          case 11:
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