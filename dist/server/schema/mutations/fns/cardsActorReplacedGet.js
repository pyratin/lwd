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

var _genre = require("../../../data/genre");

var _set = require("../../../data/set");

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
    return _starringActor.text === starringActor.text;
  });
};

var starringActorsFlatlistGetFn = function starringActorsFlatlistGetFn(card) {
  var _card$character;

  var actor = (_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.actor;
  return actor ? actor : null;
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

var setRandomForGenreGet = function setRandomForGenreGet(genre, db) {
  return (0, _genre.genreFindOne)({
    text: genre
  }, undefined, db).then(function (_ref2) {
    var genreId = _ref2._id;
    return (0, _set.setsFind)({
      _genreId: new _mongodb.ObjectID(genreId)
    }, undefined, db);
  }).then(function (sets) {
    return sets[Math.floor(Math.random() * sets.length)];
  }).then(function (_ref3) {
    var setId = _ref3._id;
    return setId;
  });
};

var actorsFind = function actorsFind(setId, gender, db) {
  return (0, _actor.actorsFind)({
    _setId: new _mongodb.ObjectID(setId),
    gender: gender
  }, undefined, db);
};

var spoofActorsGetFn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(starringActor, setRandomId, setGeneralId, spoofActorsPrevious, db) {
    var gender, spoofActors, spoofActor;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gender = starringActor.gender;
            _context.next = 3;
            return actorsFind(setRandomId, gender, db);

          case 3:
            spoofActors = _context.sent;

            if (spoofActors.length) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return actorsFind(setGeneralId, gender, db);

          case 7:
            spoofActors = _context.sent;

          case 8:
            spoofActors = shuffledGet(spoofActors);
            spoofActors = spoofActorsSortedByWeightGet(spoofActors, spoofActorsPrevious);
            spoofActor = spoofActors[0];
            return _context.abrupt("return", spoofActor);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function spoofActorsGetFn(_x, _x2, _x3, _x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var spoofActorsGet = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(starringActors, genre, db) {
    var setRandomId, setGeneralId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return setRandomForGenreGet(genre, db);

          case 2:
            setRandomId = _context2.sent;
            _context2.next = 5;
            return setRandomForGenreGet('general', db);

          case 5:
            setGeneralId = _context2.sent;
            return _context2.abrupt("return", starringActors.reduce(function (memo, starringActor) {
              return memo.then(function (res) {
                return spoofActorsGetFn(starringActor, setRandomId, setGeneralId, res, db).then(function (result) {
                  return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, result), {}, {
                    actorText: starringActor.text
                  })]);
                });
              });
            }, Promise.resolve([])));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function spoofActorsGet(_x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

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

var charactersActorAssignedGet = function charactersActorAssignedGet(characters, spoofActors) {
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
  }).map(function (_ref6) {
    var actorImageId = _ref6.actorImageId;
    return actorImageId;
  });
};

var charactersActorImageAssignedGetFn = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(character, charactersPrevious, db) {
    var actorImageIdsPrevious, actorImageIds, actorImageId, _yield$actorImageFind, base64;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            actorImageIdsPrevious = actorImageIdsPreviousGet(charactersPrevious);
            _context3.next = 3;
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
              return actorImages.map(function (_ref8) {
                var actorImageId = _ref8._id;
                return actorImageId.toString();
              });
            });

          case 3:
            actorImageIds = _context3.sent;
            actorImageIds = shuffledGet(actorImageIds);
            actorImageIds = actorImageIdsSortedByWeightGet(actorImageIds, actorImageIdsPrevious);
            actorImageId = actorImageIds[0];
            _context3.next = 9;
            return (0, _actorImage.actorImageFindOne)({
              _id: new _mongodb.ObjectID(actorImageId)
            }, undefined, db);

          case 9:
            _yield$actorImageFind = _context3.sent;
            base64 = _yield$actorImageFind.base64;
            return _context3.abrupt("return", {
              actorImageId: actorImageId,
              base64: base64
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function charactersActorImageAssignedGetFn(_x9, _x10, _x11) {
    return _ref7.apply(this, arguments);
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
        base64: character.base64,
        actorUd: character.actor.ud,
        actorId: character._actor._id
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_cards, genre, db) {
    var starringActors, spoofActors, characters, cards;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            starringActors = starringActorsFlatlistGet(_cards);
            _context4.next = 3;
            return spoofActorsGet(starringActors, genre, db);

          case 3:
            spoofActors = _context4.sent;
            characters = cardCharactersGet(_cards);
            characters = charactersActorAssignedGet(characters, spoofActors);
            _context4.next = 8;
            return charactersActorImageAssignedGet(characters, db);

          case 8:
            characters = _context4.sent;
            cards = cardsCharacterAssignedGet(characters, _cards);
            return _context4.abrupt("return", cards);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x12, _x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=cardsActorReplacedGet.js.map