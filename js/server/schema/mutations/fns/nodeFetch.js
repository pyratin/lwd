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

const nodeFetchFn = (
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
          res.status ===
          429
        ) {

          // eslint-disable-next-line no-console
          console.log(
            `
              nodeFetch: ${
                res.status
              } ${
                query
              }
            `
              .trim()
          );

          return fnDelay(
            () => {

              return nodeFetchFn(
                query
              );
            },
            2000
          );
        }

        return res.json();
      }
    );
};

export default nodeFetchFn;
