'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var spoofActorWeightAssignedGetFn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(spoofActor, _genreId, spoofActorsPrevious, db) {
    var _yield$setFindOne;

    var _spoofActorsPrevious$, count, distance, genreId, genreMatch, spoofActorPrevious, _setId, setMatch;

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
            return _context.abrupt("return", _objectSpread(_objectSpread({}, spoofActor), {}, {
              count: count,
              distance: distance,
              genreMatch: genreMatch,
              setMatch: setMatch
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function spoofActorWeightAssignedGetFn(_x, _x2, _x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var spoofActorWeightAssignedGet = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_spoofActors, genreId, spoofActorsPrevious, db) {
    var spoofActors;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _spoofActors.reduce(function (memo, _spoofActor) {
              return memo.then(function (result) {
                return spoofActorWeightAssignedGetFn(_spoofActor, genreId, spoofActorsPrevious, db).then(function (res) {
                  return [].concat((0, _toConsumableArray2["default"])(result), [res]);
                });
              });
            }, Promise.resolve([]));

          case 2:
            spoofActors = _context2.sent;
            return _context2.abrupt("return", spoofActors);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function spoofActorWeightAssignedGet(_x5, _x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
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
    }
  }).map(function (spoofActor) {
    delete spoofActor.count;
    return spoofActor;
  });
};

var spoofActorsGetFn = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(starringActor, genreId, setGeneralId, spoofActorsPrevious, db) {
    var gender, spoofActors, spoofActor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            gender = starringActor.gender;
            _context3.next = 3;
            return (0, _actor.actorsFind)({
              _setId: {
                $ne: new _mongodb.ObjectID(setGeneralId)
              },
              gender: gender
            }, undefined, db);

          case 3:
            spoofActors = _context3.sent;

            if (spoofActors.length) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return (0, _actor.actorsFind)({
              _setId: new _mongodb.ObjectID(setGeneralId),
              gender: gender
            }, undefined, db);

          case 7:
            spoofActors = _context3.sent;

          case 8:
            spoofActors = shuffledGet(spoofActors);
            _context3.next = 11;
            return spoofActorWeightAssignedGet(spoofActors, genreId, spoofActorsPrevious, db);

          case 11:
            spoofActors = _context3.sent;
            spoofActors = spoofActorsSortedGet(spoofActors, spoofActorsPrevious);
            spoofActor = spoofActors[0];
            return _context3.abrupt("return", spoofActor);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function spoofActorsGetFn(_x9, _x10, _x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

var spoofActorsGet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(starringActors, genre, db) {
    var _yield$genreFindOne;

    var genreId, setGeneralId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _genre.genreFindOne)({
              text: genre
            }, undefined, db);

          case 2:
            _context4.t1 = _yield$genreFindOne = _context4.sent;
            _context4.t0 = _context4.t1 === null;

            if (_context4.t0) {
              _context4.next = 6;
              break;
            }

            _context4.t0 = _yield$genreFindOne === void 0;

          case 6:
            if (!_context4.t0) {
              _context4.next = 10;
              break;
            }

            _context4.t2 = void 0;
            _context4.next = 11;
            break;

          case 10:
            _context4.t2 = _yield$genreFindOne._id;

          case 11:
            genreId = _context4.t2;
            _context4.next = 14;
            return setRandomForGenreGet('general', db);

          case 14:
            setGeneralId = _context4.sent;
            return _context4.abrupt("return", starringActors.reduce(function (memo, starringActor) {
              return memo.then(function (res) {
                return spoofActorsGetFn(starringActor, genreId, setGeneralId, res, db).then(function (result) {
                  return [].concat((0, _toConsumableArray2["default"])(res), [_objectSpread(_objectSpread({}, result), {}, {
                    actorText: starringActor.text
                  })]);
                });
              });
            }, Promise.resolve([])));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function spoofActorsGet(_x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
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
  }).map(function (_ref8) {
    var actorImageId = _ref8.actorImageId;
    return actorImageId;
  });
};

var charactersActorImageAssignedGetFn = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(character, charactersPrevious, db) {
    var actorImageIdsPrevious, actorImageIds, actorImageId, _yield$actorImageFind, base64;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            actorImageIdsPrevious = actorImageIdsPreviousGet(charactersPrevious);
            _context5.next = 3;
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
              return actorImages.map(function (_ref10) {
                var actorImageId = _ref10._id;
                return actorImageId.toString();
              });
            });

          case 3:
            actorImageIds = _context5.sent;
            actorImageIds = shuffledGet(actorImageIds);
            actorImageIds = actorImageIdsSortedByWeightGet(actorImageIds, actorImageIdsPrevious);
            actorImageId = actorImageIds[0];
            _context5.next = 9;
            return (0, _actorImage.actorImageFindOne)({
              _id: new _mongodb.ObjectID(actorImageId)
            }, undefined, db);

          case 9:
            _yield$actorImageFind = _context5.sent;
            base64 = _yield$actorImageFind.base64;
            return _context5.abrupt("return", {
              actorImageId: actorImageId,
              base64: base64
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function charactersActorImageAssignedGetFn(_x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
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
        base64: character.base64,
        character: {
          text: character.text,
          actor: character.actor
        }
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_cards, genre, db) {
    var starringActors, spoofActors, characters, cards;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            starringActors = starringActorsFlatlistGet(_cards);
            _context6.next = 3;
            return spoofActorsGet(starringActors, genre, db);

          case 3:
            spoofActors = _context6.sent;
            characters = cardCharactersGet(_cards);
            characters = charactersActorAssignedGet(characters, spoofActors);
            _context6.next = 8;
            return charactersActorImageAssignedGet(characters, db);

          case 8:
            characters = _context6.sent;
            cards = cardsCharacterAssignedGet(characters, _cards);
            return _context6.abrupt("return", cards);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x20, _x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=cardsActorReplacedGet.js.map