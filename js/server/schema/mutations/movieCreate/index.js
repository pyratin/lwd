'use strict';

import {
  ObjectID
} from 'mongodb';

import movieTitleRandomGet from 
  '../fns/movieTitleRandomGet';
import deckGetFn from '../fns/deckGet';
import gifRenderedGet from '../fns/gifRenderedGet';
import {
  hostUrlGet
} from '~/js/server/fns/variable';
import {
  deckFind,
  deckCountDocuments,
  deckCreate as deckCreateFn
} from '~/js/server/data/deck';
import {
  movieCreate as movieCreateFn
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';

const deckLocalRandomGet = async (
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

  const deck = (
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

  return (
    deck
  );
};

const titleGet = async (
  text
) => {

  return await movieTitleRandomGet(
    text.split(
      /:/
    )[
      1
    ]
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

  return movieCreateFn(
    {
      _id: movieId
    },
    {
      $set: {
        ...movie,
        path
      }
    },
    undefined,
    db
  );
};

const deckGet = async (
  text,
  genre,
  db,
  deckHardLimit,
  deckLimitByRolesFlag
) => {

  switch (
    true
  ) {

    case (
      !!text.match(
        /^random:local$/
      )
    ) :

      return deckLocalRandomGet(
        db
      );

    case (
      !!text.match(
        /^random:(english|hindi|tamil)$/
      )
    ) :

      return titleGet(
        text
      )
        .then(
          (
            title
          ) => {
          
            return deckGetFn(
              title,
              genre,
              db,
              deckHardLimit,
              deckLimitByRolesFlag
            );
          }
        );

    default :

      return deckGetFn(
        text,
        genre,
        db,
        deckHardLimit,
        deckLimitByRolesFlag
      );
  }
};

const outputGet = async (
  text,
  genre,
  db,
  deckHardLimit,
  deckLimitByRolesFlag,
  outputType
) => {

  const deck = await deckGet(
    text,
    genre,
    db,
    deckHardLimit,
    deckLimitByRolesFlag
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
              title: text,
              base64
            };
          }
        );
  }
};

const outputCreatedGet = (
  output,
  db,
  req,
  createFlag
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
  genre,
  db,
  req,
  deckHardLimit = 5,
  deckLimitByRolesFlag = false,
  outputType = 'movie',
  createFlag = true
) => {

  let output = await outputGet(
    text,
    genre,
    db,
    deckHardLimit,
    deckLimitByRolesFlag,
    outputType
  );

  output = await outputCreatedGet(
    output,
    db,
    req,
    createFlag
  );

  return (
    output
  );
};
