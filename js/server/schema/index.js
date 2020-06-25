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
import movieSelect from './mutations/movieSelect';

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

const MovieSelectMutation = mutationWithClientMutationId(
  {
    name: 'MovieSelect',
    inputFields: {
      title: {
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
      }
    },
    mutateAndGetPayload(
      {
        title
      },
      {
        dict
      }
    ) {

      return movieSelect(
        title,
        dict
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
        movieSelect: MovieSelectMutation
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
