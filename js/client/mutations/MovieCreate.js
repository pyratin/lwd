'use strict';

import {
  commitMutation,
  graphql
} from 'react-relay';

const mutation = graphql`
  mutation MovieCreateMutation(
    $input: MovieCreateInput!
  ) {
    movieCreate(
      input: $input
    ) {
      viewer {
        id
      },
      output {
        ...on Deck {
          id
        }
      }
    }
  }
`;

const commit = (
  variables,
  environment,
  onErrorHandle,
  onCompletedHandle
) => {

  return new Promise(
    (
      resolve
    ) => {

      return commitMutation(
        environment,
        {
          mutation,
          variables,
          onError(
            json
          ) {

            return resolve(
              onErrorHandle(
                json
              )
            );
          },
          onCompleted(
            json
          ) {

            return resolve(
              onCompletedHandle(
                json
              )
            );
          }
        }
      );
    }
  );
};

export default {
  commit
};
