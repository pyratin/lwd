'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actorsBySetIdRemove = exports.actorRemove = exports.actorCreate = exports.actorsFind = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _index = require("./index");

var _actorImage = require("./actorImage");

var actorCollectionName = 'actors';

var actorsFind = function actorsFind(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.find)(query, options, actorCollectionName, db);
};

exports.actorsFind = actorsFind;

var actorCreate = function actorCreate(filter, update) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    upsert: true,
    returnOriginal: false
  };
  var db = arguments.length > 3 ? arguments[3] : undefined;
  return (0, _index.findOneAndUpdate)(filter, update, options, actorCollectionName, db);
};

exports.actorCreate = actorCreate;

var actorRemove = function actorRemove(filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    returnOriginal: true
  };
  var db = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _index.findOneAndDelete)(filter, options, actorCollectionName, db).then( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(actor) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _actorImage.actorImagesByActorIdRemove)(actor._id, db);

            case 2:
              return _context.abrupt("return", actor);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.actorRemove = actorRemove;

var actorsBySetIdRemove = function actorsBySetIdRemove(setId, db) {
  return actorsFind({
    _setId: new _mongodb.ObjectID(setId)
  }, undefined, db).then(function (actors) {
    return actors.reduce(function (memo, _ref2) {
      var actorId = _ref2._id;
      return memo.then(function (res) {
        return actorRemove({
          _id: new _mongodb.ObjectID(actorId)
        }, undefined, db).then(function (result) {
          return [].concat((0, _toConsumableArray2["default"])(res), [result]);
        });
      });
    }, Promise.resolve([]));
  });
};

exports.actorsBySetIdRemove = actorsBySetIdRemove;
//# sourceMappingURL=actor.js.map