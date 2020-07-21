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

var _mongodb = require("mongodb");

var _actor = require("../../../data/actor");

var _actorImage = require("../../../data/actorImage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var shuffledGet = function shuffledGet(els) {
  return els.reduce(function (memo, el) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [{
      el: el,
      random: Math.random()
    }]);
  }, []).sort(function (a, b) {
    switch (true) {
      case a.random > b.random:
        return 1;

      case b.random > a.random:
        return -1;
    }
  }).map(function (_ref) {
    var el = _ref.el;
    return el;
  });
};

var starringActorExistsGet = function starringActorExistsGet(starringActor, starringActors) {
  return starringActors.find(function (_starringActor) {
    return _starringActor.ud === starringActor.ud;
  });
};

var starringActorsFlatlistGetFn = function starringActorsFlatlistGetFn(card) {
  var _card$character, _card$character2;

  var actor = (_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.actor;
  return actor ? _objectSpread({}, (_card$character2 = card.character) === null || _card$character2 === void 0 ? void 0 : _card$character2.actor) : null;
};

var starringActorsFlatlistGet = function starringActorsFlatlistGet(cards) {
  return cards.reduce(function (memo, card) {
    var starringActor = starringActorsFlatlistGetFn(card);

    if (starringActor && !starringActorExistsGet(starringActor, memo)) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [starringActor]);
    }

    return memo;
  }, []);
};

var spoofActorWeightGet = function spoofActorWeightGet(spoofActor, spoofActorsPrevious) {
  return spoofActorsPrevious.reduce(function (memo, _spoofActorsPrevious, index) {
    if (_spoofActorsPrevious._id.toString() === spoofActor._id.toString()) {
      return {
        count: memo.count + 1,
        distance: spoofActorsPrevious.length - (index + 1)
      };
    }

    return memo;
  }, {
    count: 0,
    distance: spoofActorsPrevious.length
  });
};

var spoofActorWeightAssignedGet = function spoofActorWeightAssignedGet(spoofActor, spoofActorsPrevious) {
  var weight = spoofActorWeightGet(spoofActor, spoofActorsPrevious);
  return _objectSpread(_objectSpread({}, spoofActor), weight);
};

var spoofActorsSortedByWeightGet = function spoofActorsSortedByWeightGet(spoofActors, spoofActorsPrevious) {
  var spoofActorsWeightAssigned = spoofActors.reduce(function (memo, spoofActor) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [spoofActorWeightAssignedGet(spoofActor, spoofActorsPrevious)]);
  }, []);
  return spoofActorsWeightAssigned.sort(function (a, b) {
    switch (true) {
      case a.count > b.count:
        return 1;

      case b.count > a.count:
        return -1;

      case a.distance > b.distance:
        return -1;

      case b.distance > a.distance:
        return 1;
    }
  }).map(function (spoofActor) {
    delete spoofActor.count;
    return spoofActor;
  });
};

var spoofActorsGetFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(starringActor, spoofActorsPrevious, db) {
    var spoofActors, spoofActor;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _actor.actorsFind)({
              gender: starringActor.gender
            }, null, db);

          case 2:
            spoofActors = _context.sent;
            spoofActors = shuffledGet(spoofActors);
            spoofActors = spoofActorsSortedByWeightGet(spoofActors, spoofActorsPrevious);
            spoofActor = spoofActors[0];
            return _context.abrupt("return", spoofActor);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function spoofActorsGetFn(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var spoofActorsGet = function spoofActorsGet(starringActors, db) {
  return starringActors.reduce(function (memo, starringActor) {
    return memo.then(function (res) {
      return spoofActorsGetFn(starringActor, res, db).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, result), {}, {
          actorText: starringActor.text
        })]);
      });
    });
  }, Promise.resolve([]));
};

var cardCharactersGet = function cardCharactersGet(cards) {
  return cards.reduce(function (memo, card, cardIndex) {
    var cardCharacter = card.character;

    if (cardCharacter) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, cardCharacter), {}, {
        cardIndex: cardIndex
      })]);
    }

    return memo;
  }, []);
};

var spoofActorByTextGet = function spoofActorByTextGet(actorText, spoofActors) {
  return spoofActors.find(function (spoofActor) {
    return spoofActor.actorText === actorText;
  });
};

var charactersActorsAssignedGet = function charactersActorsAssignedGet(characters, spoofActors) {
  return characters.reduce(function (memo, character) {
    var characterActorText = character.actor.text;

    if (characterActorText) {
      var spoofActor = spoofActorByTextGet(characterActorText, spoofActors);
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
        _actor: spoofActor
      })]);
    }

    return memo;
  }, []);
};

var actorImageIdsPreviousGet = function actorImageIdsPreviousGet(charactersPrevious) {
  return charactersPrevious.reduce(function (memo, character) {
    var actorImageId = character === null || character === void 0 ? void 0 : character.actorImageId;

    if (actorImageId) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [actorImageId]);
    }

    return memo;
  }, []);
};

var actorImageIdWeightGet = function actorImageIdWeightGet(actorImageId, actorImageIdsPrevious) {
  return actorImageIdsPrevious.reduce(function (memo, _actorImageIdsPrevious, index) {
    if (_actorImageIdsPrevious.toString() === actorImageId.toString()) {
      return {
        count: memo.count + 1,
        distance: actorImageIdsPrevious.length - (index + 1)
      };
    }

    return memo;
  }, {
    count: 0,
    distance: actorImageIdsPrevious.length
  });
};

var actorImageIdWeightAssignedGet = function actorImageIdWeightAssignedGet(actorImageId, actorImageIdsPrevious) {
  var weight = actorImageIdWeightGet(actorImageId, actorImageIdsPrevious);
  return _objectSpread({
    actorImageId: actorImageId
  }, weight);
};

var actorImageIdsSortedByWeightGet = function actorImageIdsSortedByWeightGet(actorImageIds, actorImageIdsPrevious) {
  var actorImageIdsWeightAssigned = actorImageIds.reduce(function (memo, actorImageId) {
    return [].concat((0, _toConsumableArray2["default"])(memo), [actorImageIdWeightAssignedGet(actorImageId, actorImageIdsPrevious)]);
  }, []);
  return actorImageIdsWeightAssigned.sort(function (a, b) {
    switch (true) {
      case a.count > b.count:
        return 1;

      case b.count > a.count:
        return -1;

      case a.distance > b.distance:
        return -1;

      case b.distance > a.distance:
        return 1;
    }
  }).map(function (_ref3) {
    var actorImageId = _ref3.actorImageId;
    return actorImageId;
  });
};

var charactersActorImageAssignedGetFn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(character, charactersPrevious, db) {
    var actorImageIdsPrevious, actorImageIds, actorImageId, _yield$actorImageFind, base64;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            actorImageIdsPrevious = actorImageIdsPreviousGet(charactersPrevious);
            _context2.next = 3;
            return (0, _actorImage.actorImagesFind)({
              _actorId: new _mongodb.ObjectID(character._actor._id)
            }, {
              projection: {
                _id: 1
              },
              sort: {},
              skip: 0,
              limit: 0
            }, db).then(function (actorImages) {
              return actorImages.map(function (_ref5) {
                var actorImageId = _ref5._id;
                return actorImageId.toString();
              });
            });

          case 3:
            actorImageIds = _context2.sent;
            actorImageIds = shuffledGet(actorImageIds);
            actorImageIds = actorImageIdsSortedByWeightGet(actorImageIds, actorImageIdsPrevious);
            actorImageId = actorImageIds[0];
            _context2.next = 9;
            return (0, _actorImage.actorImageFindOne)({
              _id: new _mongodb.ObjectID(actorImageId)
            }, null, db);

          case 9:
            _yield$actorImageFind = _context2.sent;
            base64 = _yield$actorImageFind.base64;
            return _context2.abrupt("return", {
              actorImageId: actorImageId,
              base64: base64
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function charactersActorImageAssignedGetFn(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var charactersActorImageAssignedGet = function charactersActorImageAssignedGet(characters, db) {
  return characters.reduce(function (memo, character) {
    return memo.then(function (res) {
      return charactersActorImageAssignedGetFn(character, res, db).then(function (result) {
        return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, character), result)]);
      });
    });
  }, Promise.resolve([]));
};

var characterByCardIndexGet = function characterByCardIndexGet(characters, cardIndex) {
  return characters.find(function (character) {
    return character.cardIndex === cardIndex;
  });
};

var cardsCharacterAssignedGet = function cardsCharacterAssignedGet(characters, cards) {
  return cards.reduce(function (memo, card, cardIndex) {
    var character = characterByCardIndexGet(characters, cardIndex);

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card), {}, {
        character: character.text,
        base64: character.base64
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_cards, db) {
    var starringActors, spoofActors, characters, cards;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            starringActors = starringActorsFlatlistGet(_cards);
            _context3.next = 3;
            return spoofActorsGet(starringActors, db);

          case 3:
            spoofActors = _context3.sent;
            characters = cardCharactersGet(_cards);
            characters = charactersActorsAssignedGet(characters, spoofActors);
            _context3.next = 8;
            return charactersActorImageAssignedGet(characters, db);

          case 8:
            characters = _context3.sent;
            cards = cardsCharacterAssignedGet(characters, _cards);
            return _context3.abrupt("return", cards);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=cardsActorReplacedGet.js.map