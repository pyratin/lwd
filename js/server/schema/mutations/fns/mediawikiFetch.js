'use strict';

import nodeFetch from 'node-fetch';

const fnDelay = (
  fn,
  delay
) => {

  return new Promise(
    (
      resolve
    ) => {

      return setTimeout(
        () => {

          return resolve(
            fn()
          );
        },
        delay
      );
    }
  ); 
};

const fnDelayFn = (
  query
) => {

  // eslint-disable-next-line no-console
  console.log(
    `
      mediawikiFetch: ${
        query
      }
    `
      .trim()
  );

  return fnDelay(
    () => {

      return mediawikiFetch(
        query
      );
    },
    2000
  );
};

const mediawikiFetch = (
  query
) => {

  return nodeFetch(
    query
  )
    .then(
      (
        res
      ) => {

        if (
          res.status !==
          200
        ) {

          return fnDelayFn(
            query
          );
        }

        return res.json();
      }
    )
    .catch(
      () => {

        return fnDelayFn(
          query
        );
      }
    );
};

export default mediawikiFetch;
