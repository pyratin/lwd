'use strict';

import path from 'path';
import fs from 'fs';
import {
  ObjectID
} from 'mongodb';

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
  deckCreate as deckCreateFn,
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

const deckGetFn = async (
  title,
  db
) => {

  return movieCreate(
    title,
    'general',
    db,
    null,
    false,
    false
  );
};

const deckGet = async (
  {
    title: _title,
    tagline,
    genres: _genres,
    keywords: _keywords,
    overview
  },
  index,
  db
) => {

  let exists = await deckFindOne(
    {
      _title
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

  const title = await titleMatchGet(
    _title
  );

  if (
    !title
  ) {

    return Promise.resolve();
  }

  exists = await deckFindOne(
    {
      title
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

  const deck = await deckGetFn(
    title,
    db
  );

  const genres = JSON.parse(
    _genres
  )
    .map(
      (
        {
          name
        }
      ) => {

        return (
          name
        );
      }
    );

  const keywords = JSON.parse(
    _keywords
  )
    .map(
      (
        {
          name
        }
      ) => {

        return (
          name
        );
      }
    );

  return {
    source: 'tmdb5000movies',
    title,
    _title,
    tagline,
    overview,
    genres,
    keywords,
    index,
    ...deck
  };
};

const _decksCreateFn = (
  deck,
  db
) => {

  return deckCreateFn(
    {
      _id: new ObjectID()
    },
    {
      $set: deck
    },
    undefined,
    db
  );
};

const decksCreateFn = (
  _data,
  index,
  db
) => {

  return deckGet(
    _data,
    index,
    db
  )
    .then(
      (
        deck
      ) => {

        if (
          !deck?.roles.protagonist ||
          !deck?.roles.romanticLead ||
          !deck?.roles.antagonist
        ) {

          return (
            null
          );
        }

        return _decksCreateFn(
          deck,
          db
        );
      }
    )
    .catch(
      (
        error
      ) => {

        // eslint-disable-next-line no-console
        console.log(
          error
        );
      }
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
