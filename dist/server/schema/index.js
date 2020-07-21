'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _viewer = _interopRequireDefault(require("./fns/viewer"));

var _movieSearch = _interopRequireDefault(require("./mutations/movieSearch"));

var _movieCreate = _interopRequireDefault(require("./mutations/movieCreate"));

var _variable = require("../fns/variable");

var viewerType = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref) {
          var viewerId = _ref._id;
          return viewerId;
        }
      },
      text: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var queryType = new _graphql.GraphQLObjectType({
  name: 'QUery',
  fields: function fields() {
    return {
      viewer: {
        type: viewerType,
        resolve: function resolve() {
          return (0, _viewer["default"])();
        }
      }
    };
  }
});
var movieSearchResultType = new _graphql.GraphQLObjectType({
  name: 'MovieSearchResult',
  fields: function fields() {
    return {
      title: {
        type: _graphql.GraphQLString
      },
      snippet: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var MovieSearchMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'MovieSearch',
  inputFields: {
    text: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: function resolve() {
        return (0, _viewer["default"])();
      }
    },
    results: {
      type: new _graphql.GraphQLList(movieSearchResultType),
      resolve: function resolve(results) {
        return results;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
    var text = _ref2.text;
    return (0, _movieSearch["default"])(text);
  }
});
var MovieCreateMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'MovieCreate',
  inputFields: {
    text: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: function resolve() {
        return (0, _viewer["default"])();
      }
    },
    path: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref3, args, _ref4) {
        var movieId = _ref3._id;
        var req = _ref4.req;
        return "\n            ".concat((0, _variable.hostUrlGet)(req), "/output/").concat(movieId.toString(), ".gif\n          ").trim();
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref5, _ref6) {
    var text = _ref5.text;
    var db = _ref6.db;
    return (0, _movieCreate["default"])(text, db);
  }
});
var mutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      movieSearch: MovieSearchMutation,
      movieCreate: MovieCreateMutation
    };
  }
});

var _default = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map