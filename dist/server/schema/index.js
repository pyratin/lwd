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

var movieType = new _graphql.GraphQLObjectType({
  name: 'Movie',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref) {
          var movieId = _ref._id;
          return movieId && movieId.toString();
        }
      },
      title: {
        type: _graphql.GraphQLString
      },
      gif: {
        type: _graphql.GraphQLString
      },
      path: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var viewerType = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref2) {
          var viewerId = _ref2._id;
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
  mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
    var text = _ref3.text;
    return (0, _movieSearch["default"])(text);
  }
});
var MovieCreateMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'MovieCreate',
  inputFields: {
    text: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    genre: {
      type: _graphql.GraphQLString
    }
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: function resolve() {
        return (0, _viewer["default"])();
      }
    },
    movie: {
      type: movieType,
      resolve: function resolve(movie) {
        return movie;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref4, _ref5) {
    var text = _ref4.text,
        genre = _ref4.genre;
    var db = _ref5.db,
        req = _ref5.req;
    return (0, _movieCreate["default"])(text, genre, db, req);
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