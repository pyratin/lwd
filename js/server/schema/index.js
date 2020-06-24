'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';

import viewerGet from './fns/viewer';
import movieSearch from './mutations/movieSearch';

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

const mutationType = new GraphQLObjectType(
  {
    name: 'Mutation',
    fields() {

      return {
        movieSearch: MovieSearchMutation
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
