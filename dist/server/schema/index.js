'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _viewer = _interopRequireDefault(require("./fns/viewer"));

var _movieSearch = _interopRequireDefault(require("./mutations/movieSearch"));

var _movieCreate = _interopRequireDefault(require("./mutations/movieCreate"));

var characterType = new _graphql.GraphQLObjectType({
  name: 'Character',
  fields: function fields() {
    return {
      text: {
        type: _graphql.GraphQLString
      },
      _text: {
        type: _graphql.GraphQLString
      },
      renderText: {
        type: _graphql.GraphQLString
      },
      actorImageId: {
        type: _graphql.GraphQLID
      }
    };
  }
});
var splashType = new _graphql.GraphQLObjectType({
  name: 'Splash',
  fields: function fields() {
    return {
      title: {
        type: _graphql.GraphQLString
      },
      poster: {
        type: _graphql.GraphQLString
      },
      characters: {
        type: new _graphql.GraphQLList(characterType),
        resolve: function resolve(_ref) {
          var characters = _ref.characters;
          return characters.filter(function (character) {
            return character.render;
          });
        }
      },
      spoofable: {
        type: _graphql.GraphQLBoolean
      }
    };
  }
});
var cardType = new _graphql.GraphQLObjectType({
  name: 'Card',
  fields: function fields() {
    return {
      renderText: {
        type: _graphql.GraphQLString
      },
      actorImageId: {
        type: _graphql.GraphQLID
      },
      gifyUrl: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var deckType = new _graphql.GraphQLObjectType({
  name: 'Deck',
  fields: function fields() {
    return {
      splash: {
        type: splashType
      },
      cards: {
        type: new _graphql.GraphQLList(cardType)
      }
    };
  }
});
var movieType = new _graphql.GraphQLObjectType({
  name: 'Movie',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref2) {
          var movieId = _ref2._id;
          return movieId && movieId.toString();
        }
      },
      title: {
        type: _graphql.GraphQLString
      },
      base64: {
        type: _graphql.GraphQLString
      },
      path: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var outputType = new _graphql.GraphQLUnionType({
  name: 'Output',
  types: [deckType, movieType],
  resolveType: function resolveType(_ref3) {
    var splash = _ref3.splash;
    return splash ? deckType : movieType;
  }
});
var viewerType = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        resolve: function resolve(_ref4) {
          var viewerId = _ref4._id;
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
  mutateAndGetPayload: function mutateAndGetPayload(_ref5) {
    var text = _ref5.text;
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
    },
    outputType: {
      type: _graphql.GraphQLString
    },
    createFlag: {
      type: _graphql.GraphQLBoolean
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
      type: outputType,
      resolve: function resolve(movie) {
        return movie;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref6, _ref7) {
    var text = _ref6.text,
        input = (0, _objectWithoutProperties2["default"])(_ref6, ["text"]);
    var db = _ref7.db,
        req = _ref7.req;
    return (0, _movieCreate["default"])(text, input, undefined, db, req);
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