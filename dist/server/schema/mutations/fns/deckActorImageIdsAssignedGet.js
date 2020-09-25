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

var starringActorsFlatlistGet = function starringActorsFlatlistGet(characters) {
  return characters.reduce(function (memo, character) {
    var exists = memo.find(function (_memo) {
      return _memo.text === character.actor.text;
    });

    if (character.starringCardIndexes && !exists) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character.actor), {}, {
        role: character.role
      })]);
    }

    return memo;
  }, []);
};

var spoofActorWeightAssignedGetFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(spoofActor, _genreId, genreGeneralId, spoofActorsPrevious, db) {
    var _yield$setFindOne;

    var _spoofActorsPrevious$, count, distance, genreId, genreMatch, spoofActorPrevious, _setId, setMatch, genreGeneralMatch;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _spoofActorsPrevious$ = spoofActorsPrevious.reduce(function (memo, _spoofActorsPrevious, index) {
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
            }), count = _spoofActorsPrevious$.count, distance = _spoofActorsPrevious$.distance;
            _context.next = 3;
            return (0, _set.setFindOne)({
              _id: new _mongodb.ObjectID(spoofActor._setId)
            }, undefined, db);

          case 3:
            _context.t1 = _yield$setFindOne = _context.sent;
            _context.t0 = _context.t1 === null;

            if (_context.t0) {
              _context.next = 7;
              break;
            }

            _context.t0 = _yield$setFindOne === void 0;

          case 7:
            if (!_context.t0) {
              _context.next = 11;
              break;
            }

            _context.t2 = void 0;
            _context.next = 12;
            break;

          case 11:
            _context.t2 = _yield$setFindOne._genreId;

          case 12:
            genreId = _context.t2;
            genreMatch = (_genreId === null || _genreId === void 0 ? void 0 : _genreId.toString()) === (genreId === null || genreId === void 0 ? void 0 : genreId.toString());
            spoofActorPrevious = spoofActorsPrevious[spoofActorsPrevious.length - 1];
            _setId = spoofActorPrevious ? spoofActorPrevious._setId : null;
            setMatch = (_setId === null || _setId === void 0 ? void 0 : _setId.toString()) === spoofActor._setId.toString();
            genreGeneralMatch = (genreGeneralId === null || genreGeneralId === void 0 ? void 0 : genreGeneralId.toString()) === (genreId === null || genreId === void 0 ? void 0 : genreId.toString());
            return _context.abrupt("return", _objectSpread(_objectSpread({}, spoofActor), {}, {
              count: count,
              distance: distance,
              genreMatch: genreMatch,
              setMatch: setMatch,
              genreGeneralMatch: genreGeneralMatch
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function spoofActorWeightAssignedGetFn(_x, _x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var spoofActorWeightAssignedGet = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_spoofActors, genreId, spoofActorsPrevious, db) {
    var _yield$genreFindOne, genreGeneralId, spoofActors;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _genre.genreFindOne)({
              text: 'general'
            }, undefined, db);

          case 2:
            _yield$genreFindOne = _context2.sent;
            genreGeneralId = _yield$genreFindOne._id;
            _context2.next = 6;
            return _spoofActors.reduce(function (memo, _spoofActor) {
              return memo.then(function (result) {
                return spoofActorWeightAssignedGetFn(_spoofActor, genreId, genreGeneralId, spoofActorsPrevious, db).then(function (res) {
                  return [].concat((0, _toConsumableArray2["default"])(result), [res]);
                });
              });
            }, Promise.resolve([]));

          case 6:
            spoofActors = _context2.sent;
            return _context2.abrupt("return", spoofActors);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function spoofActorWeightAssignedGet(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var spoofActorsSortedGet = function spoofActorsSortedGet(spoofActors) {
  return spoofActors.sort(function (a, b) {
    switch (true) {
      case a.count > b.count:
        return 1;

      case b.count > a.count:
        return -1;

      case a.distance > b.distance:
        return -1;

      case b.distance > a.distance:
        return 1;

      case a.genreMatch && !b.genreMatch:
        return -1;

      case b.genreMatch && !a.genreMatch:
        return 1;

      case a.setMatch && !b.setMatch:
        return -1;

      case b.setMatch && !a.setMatch:
        return 1;

      case a.genreGeneralMatch && !b.genreGeneralMatch:
        return -1;

      case b.genreGeneralMatch && !a.genreGeneralMatch:
        return 1;
    }
  });
};

var spoofActorsGetFn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(starringActor, genreId, spoofActorsPrevious, db) {
    var role, spoofActors, spoofActor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            role = starringActor.role;
            _context3.next = 3;
            return (0, _actor.actorsFind)({
              role: role
            }, undefined, db);

          case 3:
            spoofActors = _context3.sent;
            spoofActors = shuffledGet(spoofActors);
            _context3.next = 7;
            return spoofActorWeightAssignedGet(spoofActors, genreId, spoofActorsPrevious, db);

          case 7:
            spoofActors = _context3.sent;
            spoofActors = spoofActorsSortedGet(spoofActors, spoofActorsPrevious);
            spoofActor = spoofActors[0];
            return _context3.abrupt("return", spoofActor);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function spoofActorsGetFn(_x10, _x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var spoofActorsGet = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(starringActors, genre, db) {
    var _yield$genreFindOne2;

    var genreId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _genre.genreFindOne)({
              text: genre
            }, undefined, db);

          case 2:
            _context4.t1 = _yield$genreFindOne2 = _context4.sent;
            _context4.t0 = _context4.t1 === null;

            if (_context4.t0) {
              _context4.next = 6;
              break;
            }

            _context4.t0 = _yield$genreFindOne2 === void 0;

          case 6:
            if (!_context4.t0) {
              _context4.next = 10;
              break;
            }

            _context4.t2 = void 0;
            _context4.next = 11;
            break;

          case 10:
            _context4.t2 = _yield$genreFindOne2._id;

          case 11:
            genreId = _context4.t2;
            return _context4.abrupt("return", starringActors.reduce(function (memo, starringActor) {
              return memo.then(function (res) {
                return spoofActorsGetFn(starringActor, genreId, res, db).then(function (result) {
                  return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, result), {}, {
                    actorText: starringActor.text
                  })]);
                });
              });
            }, Promise.resolve([])));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function spoofActorsGet(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

var spoofActorByTextGet = function spoofActorByTextGet(actorText, spoofActors) {
  return spoofActors.find(function (spoofActor) {
    return spoofActor.actorText === actorText;
  });
};

var charactersActorAssignedGet = function charactersActorAssignedGet(characters, spoofActors) {
  return characters.reduce(function (memo, character) {
    if (character.starringCardIndexes) {
      var spoofActor = spoofActorByTextGet(character.actor.text, spoofActors);
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
        _actor: spoofActor
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
  }, []);
};

var cardCharactersGet = function cardCharactersGet(characters) {
  var starringCardIndexes = characters.reduce(function (memo, character) {
    return [].concat((0, _toConsumableArray2["default"])(memo), (0, _toConsumableArray2["default"])(character.starringCardIndexes || []));
  }, []);
  var starringCardIndexMax = starringCardIndexes.length ? Math.max.apply(Math, (0, _toConsumableArray2["default"])(starringCardIndexes)) : -1;
  var cardCharacters = new Array(starringCardIndexMax + 1).fill();
  cardCharacters = cardCharacters.reduce(function (memo, _, index) {
    var character = characters.find(function (character) {
      var _character$starringCa;

      return (_character$starringCa = character.starringCardIndexes) === null || _character$starringCa === void 0 ? void 0 : _character$starringCa.includes(index);
    });

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread({}, character)]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [null]);
  }, []);
  return cardCharacters;
};

var actorImageIdsPreviousGet = function actorImageIdsPreviousGet(cardCharacters) {
  return cardCharacters.reduce(function (memo, cardCharacter) {
    var actorImageId = cardCharacter === null || cardCharacter === void 0 ? void 0 : cardCharacter.actorImageId;

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

var cardCharactersActorImageIdAssignedGetFn = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(cardCharacter, cardCharacters, db) {
    var actorImageIdsPrevious, actorImageIds, actorImageId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (cardCharacter === null || cardCharacter === void 0 ? void 0 : cardCharacter.starringCardIndexes) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", Promise.resolve(null));

          case 2:
            actorImageIdsPrevious = actorImageIdsPreviousGet(cardCharacters);
            _context5.next = 5;
            return (0, _actorImage.actorImagesFind)({
              _actorId: new _mongodb.ObjectID(cardCharacter._actor._id)
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

          case 5:
            actorImageIds = _context5.sent;
            actorImageIds = shuffledGet(actorImageIds);
            actorImageIds = actorImageIdsSortedByWeightGet(actorImageIds, actorImageIdsPrevious);
            actorImageId = actorImageIds[0];
            return _context5.abrupt("return", actorImageId);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function cardCharactersActorImageIdAssignedGetFn(_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

var cardCharactersActorImageIdAssignedGet = function cardCharactersActorImageIdAssignedGet(cardCharacters, db) {
  return cardCharacters.reduce(function (memo, cardCharacter) {
    return memo.then(function (res) {
      return cardCharactersActorImageIdAssignedGetFn(cardCharacter, res, db).then(function (result) {
        if (result) {
          delete cardCharacter._actor;
          return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, cardCharacter), {}, {
            actorImageId: result
          })]);
        }

        return [].concat((0, _toConsumableArray2["default"])(res), [cardCharacter]);
      });
    });
  }, Promise.resolve([]));
};

var cardsCharacterAssignedGet = function cardsCharacterAssignedGet(cards, cardCharacters) {
  return cards.reduce(function (memo, card, index) {
    var cardCharacter = cardCharacters[index];

    if (cardCharacter) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card), {}, {
        actorImageId: cardCharacter.actorImageId
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var charactersActorImageIdAssignedGet = function charactersActorImageIdAssignedGet(characters, cardCharacters) {
  return characters.reduce(function (memo, character) {
    var cardCharacter = cardCharacters.find(function (cardCharacter) {
      return (cardCharacter === null || cardCharacter === void 0 ? void 0 : cardCharacter.starringIndex) === character.starringIndex;
    });
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      actorImageId: cardCharacter === null || cardCharacter === void 0 ? void 0 : cardCharacter.actorImageId
    })]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(deck, genre, db) {
    var starringActors, spoofActors, characters, cardCharacters, cards;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            starringActors = starringActorsFlatlistGet(deck.splash.characters);
            _context6.next = 3;
            return spoofActorsGet(starringActors, genre, db);

          case 3:
            spoofActors = _context6.sent;
            characters = charactersActorAssignedGet(deck.splash.characters, spoofActors);
            cardCharacters = cardCharactersGet(characters);
            _context6.next = 8;
            return cardCharactersActorImageIdAssignedGet(cardCharacters, db);

          case 8:
            cardCharacters = _context6.sent;
            cards = cardsCharacterAssignedGet(deck.cards, cardCharacters);
            characters = charactersActorImageIdAssignedGet(characters, cardCharacters);
            return _context6.abrupt("return", _objectSpread(_objectSpread({}, deck), {}, {
              cards: cards,
              splash: _objectSpread(_objectSpread({}, deck.splash), {}, {
                characters: characters
              })
            }));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x20, _x21, _x22) {
    return _ref9.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=deckActorImageIdsAssignedGet.js.map