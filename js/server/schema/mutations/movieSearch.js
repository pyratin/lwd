'use strict';

import nodeFetch from './fns/nodeFetch';
import movieDataBasicGet from './fns/movieDataBasicGet';

const movieSearchQueryGetFn = (
  text
) => {

  return text
    .trim()
    .replace(
      /\s+/g,
      '~%20'
    );
};

const movieSearchQueryGet = (
  text
) => {

  return `
    https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=intitle:${
      movieSearchQueryGetFn(
        text
      )
    }+incategory:tamil-language_films|hindi-language_films|English-language_films&srlimit=5&format=json
  `
    .trim();
};

const movieSearchResultsGet = async (
  text
) => {

  const query = movieSearchQueryGet(
    text
  );

  const json = await nodeFetch(
    query
  );

  let results = json.query.search
    .map(
      (
        {
          title,
          snippet
        }
      ) => {

        return {
          title,
          snippet
        };
      }
    );

  return (
    results
  );
};

const movieSearchResultCheck = async (
  result
) => {

  const {
    cast,
    plot
  } = await movieDataBasicGet(
    result.title
  );

  return (
    !!cast &&
    !!plot
  );
};

const movieSearchResultsFilteredGet = (
  results
) => {

  return results.reduce(
    (
      memo,
      _result
    ) => {

      return memo.then(
        (
          res
        ) => {

          return movieSearchResultCheck(
            _result
          )
            .then(
              (
                result
              ) => {

                if (
                  result
                ) {

                  return [
                    ...res,
                    _result
                  ];
                }

                return (
                  res
                );
              }
            );
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

export default async (
  text
) => {

  let results = await movieSearchResultsGet(
    text
  );

  results = await movieSearchResultsFilteredGet(
    results
  );

  return (
    results
  );
};
