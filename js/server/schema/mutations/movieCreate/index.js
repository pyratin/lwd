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
import deckSpoofedGet from '../fns/deckSpoofedGet';
import deckActorImageIdsAssignedGet 
  from '../fns/deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet 
  from '../fns/deckRenderDetailsAssignedGet';
import deckGifyUrlsAssignedGet 
  from '../fns/deckGifyUrlsAssignedGet';
import movieSearch from 
  '../movieSearch';
import {
  movieCreate as movieCreateFn
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';

const deckLocalPreRenderHandledGet = (
  _deck,
  genre,
  db
) => {

  const deck = deckSpoofedGet(
    _deck,
    genre
  );

  return deckActorImageIdsAssignedGet(
    deck,
    genre,
    db
  )
    .then(
      (
        deck
      ) => {

        return deckRenderDetailsAssignedGet(
          deck
        );
      }
    )
    .then(
      (
        deck
      ) => {

        return deckGifyUrlsAssignedGet(
          deck
        );
      }
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

const deckLocalPreviewGet = async (
  index,
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

  deck = await deckLocalPreRenderHandledGet(
    deck,
    genre,
    db
  );

  return (
    deck
  );
};

const deckLocalRandomGet = async (
  genre,
  db
) => {

  const count = await deckCountDocuments(
    {},
    undefined,
    db
  );

  const skip = Math.floor(
    Math.random() *
    count
  );

  let deck = (
    await deckFind(
      {},
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

    return deckLocalRandomGet(
      genre,
      db
    );
  }

  deck = await deckLocalPreRenderHandledGet(
    deck,
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
        /^preview:\d+$/
      )
    ) :

      return deckLocalPreviewGet(
        parseInt(
          text.split(
            ':'
          )[
            1
          ]
        ),
        genre,
        db
      );

    case (
      !!text.match(
        /^random:local$/
      )
    ) :

      return deckLocalRandomGet(
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

      return deckLocalPreRenderHandledGet(
        deck,
        genre,
        db
      );

    default :

      return deckGetFn(
        text,
        genre,
        plotLimit,
        db
      );
  }
};

const outputGet = async (
  text,
  genre,
  plotLimit,
  outputType,
  db
) => {

  const deck = await deckGet(
    text,
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
  input,
  plotLimit = 5,
  db,
  req
) => {

  const {
    genre = 'general',
    outputType = 'movie',
    createFlag = true
  } = input;

  let output = await outputGet(
    text,
    genre,
    plotLimit,
    outputType,
    db
  );

  output = await outputCreatedGet(
    output,
    createFlag,
    db,
    req
  );

  return (
    output
  );
};
