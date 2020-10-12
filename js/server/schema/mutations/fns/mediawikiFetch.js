'use strict';

import nodeFetch from 'node-fetch';

import fnDelayRunFn from './fnDelayRun';

const fnDelayRun = (
  query
) => {

  return fnDelayRunFn(
    mediawikiFetch,
    500,
    `
      mediawikiFetch: ${
        query
      }
    `
      .trim(),
    query
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

          return fnDelayRun(
            query
          );
        }

        return res.json();
      }
    )
    .catch(
      () => {

        return fnDelayRun(
          query
        );
      }
    );
};

export default mediawikiFetch;
