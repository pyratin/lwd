'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLUnionType
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';

import viewerGet from './fns/viewer';
import movieSearch from './mutations/movieSearch';
import movieCreate from './mutations/movieCreate';

const characterType = new GraphQLObjectType(
  {
    name: 'Character',
    fields() {

      return {
        text: {
          type: GraphQLString
        },
        _text: {
          type: GraphQLString
        },
        renderText: {
          type: GraphQLString
        },
        actorImageId: {
          type: GraphQLID
        }
      };
    }
  }
);

const splashType = new GraphQLObjectType(
  {
    name: 'Splash',
    fields() {

      return {
        title: {
          type: GraphQLString,
        },
        poster: {
          type: GraphQLString
        },
        characters: {
          type: new GraphQLList(
            characterType
          ),
          resolve(
            {
              characters
            }
          ) {

            return characters.filter(
              (
                character
              ) => {

                return (
                  character.render
                );
              }
            );
          }
        },
        spoofable: {
          type: GraphQLBoolean
        }
      };
    }
  }
);

const cardType = new GraphQLObjectType(
  {
    name: 'Card',
    fields() {

      return {
        renderText: {
          type: GraphQLString
        },
        actorImageId: {
          type: GraphQLID
        },
        gifyUrl: {
          type: GraphQLString
        }
      };
    }
  }
);

const deckType = new GraphQLObjectType(
  {
    name: 'Deck',
    fields() {

      return {
        splash: {
          type: splashType
        },
        cards: {
          type: new GraphQLList(
            cardType
          )
        }
      };
    }
  }
);

const movieType = new GraphQLObjectType(
  {
    name: 'Movie',
    fields() {

      return {
        id: {
          type: GraphQLID,
          resolve(
            {
              _id: movieId
            }
          ) {

            return (
              movieId
            ) &&
              movieId.toString();
          }
        },
        title: {
          type: GraphQLString
        },
        base64: {
          type: GraphQLString
        },
        path: {
          type: GraphQLString
        }
      };
    }
  }
);

const outputType = new GraphQLUnionType(
  {
    name: 'Output',
    types: [
      deckType,
      movieType
    ],
    resolveType(
      {
        splash
      }
    ) {

      return (
        splash
      ) ?
        deckType :
        movieType;
    }
  }
);

const viewerType = new GraphQLObjectType(
  {
    name: 'Viewer',
    fields() {

      return {
        id: {
          type: GraphQLID,
          resolve(
            {
              _id: viewerId
            }
          ) {

            return (
              viewerId
            );
          }
        },
        text: {
          type: GraphQLString
        }
      };
    }
  }
);

const queryType = new GraphQLObjectType(
  {
    name: 'QUery',
    fields() {

      return {
        viewer: {
          type: viewerType,
          resolve() {

            return viewerGet();
          }
        }
      };
    }
  }
);

const movieSearchResultType = new GraphQLObjectType(
  {
    name: 'MovieSearchResult',
    fields() {

      return {
        title: {
          type: GraphQLString
        },
        snippet: {
          type: GraphQLString
        }
      };
    }
  }
);

const MovieSearchMutation = mutationWithClientMutationId(
  {
    name: 'MovieSearch',
    inputFields: {
      text: {
        type: new GraphQLNonNull(
          GraphQLString
        )
      }
    },
    outputFields: {
      viewer: {
        type: viewerType,
        resolve() {

          return viewerGet();
        }
      },
      results: {
        type: new GraphQLList(
          movieSearchResultType
        ),
        resolve(
          results
        ) {

          return (
            results
          );
        }
      }
    },
    mutateAndGetPayload(
      {
        text
      }
    ) {

      return movieSearch(
        text
      );
    }
  }
);

const MovieCreateMutation = mutationWithClientMutationId(
  {
    name: 'MovieCreate',
    inputFields: {
      text: {
        type: new GraphQLNonNull(
          GraphQLString
        )
      },
      genre: {
        type: GraphQLString
      },
      outputType: {
        type: GraphQLString
      },
      createFlag: {
        type: GraphQLBoolean
      }
    },
    outputFields: {
      viewer: {
        type: viewerType,
        resolve() {

          return viewerGet();
        }
      },
      movie: {
        type: outputType,
        resolve(
          movie
        ) {

          return (
            movie
          );
        }
      },
    },
    mutateAndGetPayload(
      {
        text,
        ...input
      },
      {
        db,
        req
      }
    ) {

      return movieCreate(
        text,
        input,
        undefined,
        db,
        req
      );
    }
  }
);

const mutationType = new GraphQLObjectType(
  {
    name: 'Mutation',
    fields() {

      return {
        movieSearch: MovieSearchMutation,
        movieCreate: MovieCreateMutation
      };
    }
  }
);

export default new GraphQLSchema(
  {
    query: queryType,
    mutation: mutationType
  }
);
