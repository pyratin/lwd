'use strict';

import path from 'path';
import fs from 'fs';
import {
  ObjectID
} from 'mongodb';

import deckGetFn from '../fns/deckGet';
import gifRenderedGet from '../fns/gifRenderedGet';
import {
  hostUrlGet
} from '~/js/server/fns/variable';
import {
  deckFind,
  deckFindOne,
  deckCountDocuments,
  deckCreate as deckCreateFn
} from '~/js/server/data/deck';
import movieSearch from 
  '../movieSearch';
import {
  movieCreate as movieCreateFn
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';


const sourceName = 'tmdb5000movies';

const deckCachedHandledGet = (
  deck,
  spoofInput,
  genre,
  db
) => {

  return deckGetFn(
    deck,
    spoofInput,
    genre,
    undefined,
    db
  );
};

const tmd5000moviesTitleByIndexGet = async (
  index
) => {

  const dataFilename = 'tmdb_5000_movies.json';

  const datasetsFolderPathString = 'temp/datasets';

  const jsonFilePath = path.join(
    process.cwd(),
    datasetsFolderPathString,
    'json',
    dataFilename
  );

  let data = await(
    new Promise(
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
    )
  );

  const title = data[
    index
  ]?.title;

  return (
    title
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

const deckByIdGet = async (
  deckId,
  spoofInput,
  genre,
  db
) => {

  let deck = await deckFindOne(
    {
      _id: new ObjectID(
        deckId
      )
    },
    undefined,
    db
  );

  deck = await deckCachedHandledGet(
    deck,
    spoofInput,
    genre,
    db
  );

  return (
    deck
  );
};

const deckByIndexGet = async (
  index,
  spoofInput,
  genre,
  db
) => {

  let text = await tmd5000moviesTitleByIndexGet(
    index
  );

  text = await titleMatchGet(
    text
  );

  let deck = await deckFindOne(
    {
      'splash.title': text
    },
    undefined,
    db
  );

  deck = await deckCachedHandledGet(
    deck,
    spoofInput,
    genre,
    db
  );

  return (
    deck
  );
};

const deckRandomGet = async (
  spoofInput,
  genre,
  db
) => {

  const count = await deckCountDocuments(
    {
      source: sourceName
    },
    undefined,
    db
  );

  const skip = Math.floor(
    Math.random() *
    count
  );

  let deck = (
    await deckFind(
      {
        source: sourceName
      },
      {
        skip,
        limit: 1
      },
      db
    )
  )[
    0
  ];

  if (
    !deck.splash.spoofable
  ) {

    return deckRandomGet(
      spoofInput,
      genre,
      db
    );
  }

  deck = await deckCachedHandledGet(
    deck,
    spoofInput,
    genre,
    db
  );

  return (
    deck
  );
};

const movieCreate = async (
  movie,
  db,
  req
) => {

  const movieId = new ObjectID();

  const path = `
    ${
      hostUrlGet(
        req
      )
    }/output/${
      movieId.toString()
    }.gif
  `
    .trim();

  const url = `
    ${
      hostUrlGet(
        req
      )
    }/movies/${
      movieId.toString()
    }
  `
    .trim();

  return movieCreateFn(
    {
      _id: movieId
    },
    {
      $set: {
        ...movie,
        path,
        url
      }
    },
    undefined,
    db
  );
};

const deckGet = async (
  text,
  spoofInput,
  genre,
  plotLimit,
  db
) => {

  let deck;

  switch (
    true
  ) {

    case (
      !!text.match(
        /^id:.{24}$/
      )
    ) :

      return deckByIdGet(
        text.split(
          /:/
        )[
          1
        ],
        spoofInput,
        genre,
        db
      );

    case (
      !!text.match(
        /^index:\d+$/
      )
    ) :

      return deckByIndexGet(
        parseInt(
          text.split(
            /:/
          )[
            1
          ]
        ),
        spoofInput,
        genre,
        db
      );

    case (
      !!text.match(
        /^random$/
      )
    ) :

      return deckRandomGet(
        spoofInput,
        genre,
        db
      );

    case (
      (
        deck = await deckFindOne(
          {
            'splash.title': text
          },
          undefined,
          db
        )
      ) &&
      !!deck
    ) :

      return deckCachedHandledGet(
        deck,
        spoofInput,
        genre,
        db
      );

    default :

      return deckGetFn(
        text,
        spoofInput,
        genre,
        plotLimit,
        db
      );
  }
};

const outputGet = async (
  text,
  spoofInput,
  genre,
  outputType,
  plotLimit,
  db
) => {

  const deck = await deckGet(
    text,
    spoofInput,
    genre,
    plotLimit,
    db
  );

  switch (
    true
  ) {

    case (
      outputType === 
      'deck'
    ) :

      return Promise.resolve(
        deck
      );

    default :

      return gifRenderedGet(
        deck,
        db
      )
        .then(
          (
            base64
          ) => {

            return {
              title: deck.splash.title,
              base64
            };
          }
        );
  }
};

const outputCreatedGet = (
  output,
  createFlag,
  db,
  req
) => {

  switch (
    true
  ) {

    case (
      !createFlag
    ) :
    case (
      !!output._id
    ) :

      return Promise.resolve(
        output
      );

    case (
      !!output.base64
    ) :

      return movieCreate(
        output,
        db,
        req
      )
        .then(
          (
            movie
          ) => {

            return movieWrite(
              movie
            );
          }
        );

    default :

      return deckCreateFn(
        {
          _id: new ObjectID()
        },
        {
          $set: output
        },
        undefined,
        db
      );
  }
};

export default async (
  text,
  options = {},
  db,
  req
) => {

  const {
    source = 'user',
    spoofInput = undefined,
    genre = undefined,
    outputType = 'deck',
    createFlag = false,
    plotLimit = 5
  } = options;

  let output = await outputGet(
    text,
    spoofInput,
    genre,
    outputType,
    plotLimit,
    db
  );

  output = await outputCreatedGet(
    {
      source,
      ...output
    },
    createFlag,
    db,
    req
  );

  return (
    output
  );
};
