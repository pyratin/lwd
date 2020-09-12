'use strict';

import path from 'path';
import fs from 'fs';

import {
  mongoUriGet
} from '~/js/server/fns/variable';
import mongoClientConnect
  from '~/js/server/fns/mongoClientConnect';
import jsonFromCsvGet from './jsonFromCsvGet';
import movieSearch from 
  '~/js/server/schema/mutations/movieSearch';
import movieCreate from 
  '~/js/server/schema/mutations/movieCreate';
import {
  deckFindOne
} from '~/js/server/data/deck';

const dataFilename = 'tmdb_5000_movies';

const datasetsFolderPathString = 'temp/datasets';

const dataGet = (
  jsonFilePath
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        jsonFilePath,
        'utf8',
        (
          error,
          res
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          return resolve(
            JSON.parse(
              res
            )
          );
        }
      );
    }
  );
};

const titleMatchGet = (
  _title
) => {

  return movieSearch(
    _title,
    1,
    false
  )
    .then(
      (
        res
      ) => {

        const title = res[
          0
        ]?.title;

        const match = title?.match(
          _title
        );

        return (
          match
        ) ?
          title :
          null;
      }
    );
};

const decksCreateFn = async (
  _data,
  index,
  db
) => {

  const title = await titleMatchGet(
    _data.title
  );

  if (
    !title
  ) {

    return Promise.resolve();
  }

  let exists = await deckFindOne(
    {
      'splash.title': title
    },
    undefined,
    db
  );

  if (
    exists
  ) {

    return Promise.resolve(
      null
    );
  }

  return movieCreate(
    title,
    'general',
    db,
    null,
    5,
    true,
    'deck',
    true
  );
};

const decksCreate = async (
  data,
  db
) => {

  return data
    .reduce(
      (
        memo,
        _data,
        index
      ) => {

        return memo.then(
          (
            res
          ) => {

            return decksCreateFn(
              _data,
              index,
              db
            )
              .then(
                (
                  result
                ) => {

                  return [
                    ...res,
                    result
                  ];
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

const tmdb5000movieDecksCreate = async () => {

  const db = await mongoClientConnect(
    mongoUriGet()
  );

  await jsonFromCsvGet(
    dataFilename,
    datasetsFolderPathString
  );

  const jsonFilePath = path.join(
    process.cwd(),
    datasetsFolderPathString,
    'json',
    `
      ${
        dataFilename
      }.json
    `
      .trim()
  );

  const data = await dataGet(
    jsonFilePath
  );

  const decks = 
    await decksCreate(
      data,
      db
    );

  // eslint-disable-next-line no-console
  console.log(
    `
      tmdb5000movieDecksCreate: ${
        decks.length
      }
    `
      .trim()
  );
};


if (
  !module.parent
) {

  tmdb5000movieDecksCreate();
}

export default tmdb5000movieDecksCreate;
