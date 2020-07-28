'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';

import viewerGet from './fns/viewer';
import movieSearch from './mutations/movieSearch';
import movieCreate from './mutations/movieCreate';

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
        gif: {
          type: GraphQLString
        },
        path: {
          type: GraphQLString
        }
      };
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
        type: movieType,
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
        genre
      },
      {
        db,
        req
      }
    ) {

      return movieCreate(
        text,
        genre,
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
