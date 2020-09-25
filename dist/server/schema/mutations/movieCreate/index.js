'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mongodb = require("mongodb");

var _deckGet = _interopRequireDefault(require("../fns/deckGet"));

var _gifRenderedGet = _interopRequireDefault(require("../fns/gifRenderedGet"));

var _variable = require("../../../fns/variable");

var _deck2 = require("../../../data/deck");

var _deckSpoofedGet = _interopRequireDefault(require("../fns/deckSpoofedGet"));

var _deckActorImageIdsAssignedGet = _interopRequireDefault(require("../fns/deckActorImageIdsAssignedGet"));

var _deckRenderDetailsAssignedGet = _interopRequireDefault(require("../fns/deckRenderDetailsAssignedGet"));

var _deckGifyUrlsAssignedGet = _interopRequireDefault(require("../fns/deckGifyUrlsAssignedGet"));

var _movieSearch = _interopRequireDefault(require("../movieSearch"));

var _movie = require("../../../data/movie");

var _movieWrite = _interopRequireDefault(require("../fns/movieWrite"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var deckLocalPreRenderHandledGet = function deckLocalPreRenderHandledGet(_deck, genre, db) {
  var deck = (0, _deckSpoofedGet["default"])(_deck, genre);
  return (0, _deckActorImageIdsAssignedGet["default"])(deck, genre, db).then(function (deck) {
    return (0, _deckRenderDetailsAssignedGet["default"])(deck);
  }).then(function (deck) {
    return (0, _deckGifyUrlsAssignedGet["default"])(deck);
  });
};

var tmd5000moviesTitleByIndexGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(index) {
    var _data$index;

    var dataFilename, datasetsFolderPathString, jsonFilePath, data, title;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataFilename = 'tmdb_5000_movies.json';
            datasetsFolderPathString = 'temp/datasets';
            jsonFilePath = _path["default"].join(process.cwd(), datasetsFolderPathString, 'json', dataFilename);
            _context.next = 5;
            return new Promise(function (resolve, reject) {
              return _fs["default"].readFile(jsonFilePath, 'utf8', function (error, res) {
                if (error) {
                  return reject(error);
                }

                return resolve(JSON.parse(res));
              });
            });

          case 5:
            data = _context.sent;
            title = (_data$index = data[index]) === null || _data$index === void 0 ? void 0 : _data$index.title;
            return _context.abrupt("return", title);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function tmd5000moviesTitleByIndexGet(_x) {
    return _ref.apply(this, arguments);
  };
}();

var titleMatchGet = function titleMatchGet(_title) {
  return (0, _movieSearch["default"])(_title, 1, false).then(function (res) {
    var _res$;

    var title = (_res$ = res[0]) === null || _res$ === void 0 ? void 0 : _res$.title;
    var match = title === null || title === void 0 ? void 0 : title.match(_title);
    return match ? title : null;
  });
};

var deckLocalPreviewGet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(index, genre, db) {
    var text, deck;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tmd5000moviesTitleByIndexGet(index);

          case 2:
            text = _context2.sent;
            _context2.next = 5;
            return titleMatchGet(text);

          case 5:
            text = _context2.sent;
            _context2.next = 8;
            return (0, _deck2.deckFindOne)({
              'splash.title': text
            }, undefined, db);

          case 8:
            deck = _context2.sent;
            _context2.next = 11;
            return deckLocalPreRenderHandledGet(deck, genre, db);

          case 11:
            deck = _context2.sent;
            return _context2.abrupt("return", deck);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deckLocalPreviewGet(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deckLocalRandomGet = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(genre, db) {
    var count, skip, deck;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _deck2.deckCountDocuments)({}, undefined, db);

          case 2:
            count = _context3.sent;
            skip = Math.floor(Math.random() * count);
            _context3.next = 6;
            return (0, _deck2.deckFind)({}, {
              skip: skip,
              limit: 1
            }, db);

          case 6:
            deck = _context3.sent[0];

            if (deck.splash.spoofable) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", deckLocalRandomGet(genre, db));

          case 9:
            _context3.next = 11;
            return deckLocalPreRenderHandledGet(deck, genre, db);

          case 11:
            deck = _context3.sent;
            return _context3.abrupt("return", deck);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deckLocalRandomGet(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var movieCreate = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(movie, db, req) {
    var movieId, path;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            movieId = new _mongodb.ObjectID();
            path = "\n    ".concat((0, _variable.hostUrlGet)(req), "/output/").concat(movieId.toString(), ".gif\n  ").trim();
            return _context4.abrupt("return", (0, _movie.movieCreate)({
              _id: movieId
            }, {
              $set: _objectSpread(_objectSpread({}, movie), {}, {
                path: path
              })
            }, undefined, db));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function movieCreate(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var deckGet = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(text, genre, plotLimit, db) {
    var deck;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = true;

            if (!(_context5.t0 === !!text.match(/^preview:\d+$/))) {
              _context5.next = 5;
              break;
            }

            _context5.t1 = 25;
            _context5.next = 23;
            break;

          case 5:
            if (!(_context5.t0 === !!text.match(/^random:local$/))) {
              _context5.next = 9;
              break;
            }

            _context5.t2 = 26;
            _context5.next = 22;
            break;

          case 9:
            _context5.t3 = _context5.t0;
            _context5.next = 12;
            return (0, _deck2.deckFindOne)({
              'splash.title': text
            }, undefined, db);

          case 12:
            _context5.t4 = deck = _context5.sent;

            if (!_context5.t4) {
              _context5.next = 15;
              break;
            }

            _context5.t4 = !!deck;

          case 15:
            _context5.t5 = _context5.t4;

            if (!(_context5.t3 === _context5.t5)) {
              _context5.next = 20;
              break;
            }

            _context5.t6 = 27;
            _context5.next = 21;
            break;

          case 20:
            _context5.t6 = 28;

          case 21:
            _context5.t2 = _context5.t6;

          case 22:
            _context5.t1 = _context5.t2;

          case 23:
            _context5.next = _context5.t1;
            break;

          case 25:
            return _context5.abrupt("return", deckLocalPreviewGet(parseInt(text.split(':')[1]), genre, db));

          case 26:
            return _context5.abrupt("return", deckLocalRandomGet(genre, db));

          case 27:
            return _context5.abrupt("return", deckLocalPreRenderHandledGet(deck, genre, db));

          case 28:
            return _context5.abrupt("return", (0, _deckGet["default"])(text, genre, plotLimit, db));

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deckGet(_x10, _x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var outputGet = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(text, genre, plotLimit, outputType, db) {
    var deck;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return deckGet(text, genre, plotLimit, db);

          case 2:
            deck = _context6.sent;
            _context6.t0 = true;
            _context6.next = _context6.t0 === (outputType === 'deck') ? 6 : 7;
            break;

          case 6:
            return _context6.abrupt("return", Promise.resolve(deck));

          case 7:
            return _context6.abrupt("return", (0, _gifRenderedGet["default"])(deck, db).then(function (base64) {
              return {
                title: deck.splash.title,
                base64: base64
              };
            }));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function outputGet(_x14, _x15, _x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var outputCreatedGet = function outputCreatedGet(output, createFlag, db, req) {
  switch (true) {
    case !createFlag:
      return Promise.resolve(output);

    case !!output.base64:
      return movieCreate(output, db, req).then(function (movie) {
        return (0, _movieWrite["default"])(movie);
      });

    default:
      return (0, _deck2.deckCreate)({
        _id: new _mongodb.ObjectID()
      }, {
        $set: output
      }, undefined, db);
  }
};

var _default = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(text, input) {
    var plotLimit,
        db,
        req,
        _input$genre,
        genre,
        _input$outputType,
        outputType,
        _input$createFlag,
        createFlag,
        output,
        _args7 = arguments;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            plotLimit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 5;
            db = _args7.length > 3 ? _args7[3] : undefined;
            req = _args7.length > 4 ? _args7[4] : undefined;
            _input$genre = input.genre, genre = _input$genre === void 0 ? 'general' : _input$genre, _input$outputType = input.outputType, outputType = _input$outputType === void 0 ? 'movie' : _input$outputType, _input$createFlag = input.createFlag, createFlag = _input$createFlag === void 0 ? true : _input$createFlag;
            _context7.next = 6;
            return outputGet(text, genre, plotLimit, outputType, db);

          case 6:
            output = _context7.sent;
            _context7.next = 9;
            return outputCreatedGet(output, createFlag, db, req);

          case 9:
            output = _context7.sent;
            return _context7.abrupt("return", output);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=index.js.map