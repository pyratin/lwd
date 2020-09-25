'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _movie = require("../data/movie");

var _movieWrite = _interopRequireDefault(require("../schema/mutations/fns/movieWrite"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(db, req, res) {
    var movieId, movie;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            movieId = req.params.movieGif.match(/^\w{24}/)[0];
            _context.next = 3;
            return (0, _movie.movieFindOne)({
              _id: new _mongodb.ObjectID(movieId)
            }, undefined, db);

          case 3:
            movie = _context.sent;
            _context.next = 6;
            return (0, _movieWrite["default"])(movie);

          case 6:
            return _context.abrupt("return", res.redirect(req.path));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=movieOutputGifRouteHandle.js.map