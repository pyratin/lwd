'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _variable = require("./fns/variable");

var _schema = _interopRequireDefault(require("./schema"));

var _mongoClientConnect = _interopRequireDefault(require("./fns/mongoClientConnect"));

var _mediaOutputFolderInit = _interopRequireDefault(require("./fns/mediaOutputFolderInit"));

var _movieOutputGifRouteHandle = _interopRequireDefault(require("./fns/movieOutputGifRouteHandle"));

var _movieIdRouteHandle = _interopRequireDefault(require("./fns/movieIdRouteHandle"));

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var db, port;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _mediaOutputFolderInit["default"])();

        case 2:
          _context2.next = 4;
          return (0, _mongoClientConnect["default"])((0, _variable.mongoUriGet)());

        case 4:
          db = _context2.sent;
          port = (0, _variable.portGet)();
          return _context2.abrupt("return", (0, _express["default"])().set('view engine', 'ejs').use(_express["default"]["static"](_path["default"].join(process.cwd(), 'dist/client'))).use(_express["default"]["static"](_path["default"].join(process.cwd(), 'media'))).use('/graphql', /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", (0, _expressGraphql["default"])({
                        schema: _schema["default"],
                        pretty: true,
                        graphiql: true,
                        context: {
                          db: db,
                          req: req
                        }
                      })(req, res));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          }()).get('/output/:movieGif(\\w{24}.gif)', function (req, res) {
            return (0, _movieOutputGifRouteHandle["default"])(db, req, res);
          }).get('/movies/:movieId(\\w{24})', function (req, res) {
            return (0, _movieIdRouteHandle["default"])(db, req, res);
          }).get('*', function (req, res) {
            return res.render('index', {
              title: (0, _variable.titleGet)(),
              path: ''
            });
          }).listen(port, function () {
            // eslint-disable-next-line no-console
            console.log("\n              listening at http://localhost:".concat(port, " in ").concat((0, _variable.nodeEnvGet)(), " mode\n            ").trim());
            return null;
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();
//# sourceMappingURL=index.js.map