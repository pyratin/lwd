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
  deckFindOne,
  deckCountDocuments,
  deckCreate as deckCreateFn
} from '~/js/server/data/deck';
import deckCulledByLimitGet 
  from '../fns/deckCulledByLimitGet';
import deckSpoofedGet from '../fns/deckSpoofedGet';
import deckActorImageIdsAssignedGet 
  from '../fns/deckActorImageIdsAssignedGet';
import {
  movieCreate as movieCreateFn
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';

const deckLocalPreRenderHandledGet = (
  deck,
  genre,
  db,
  deckHardLimit,
  spoofFlag
) => {

  return Promise.resolve(
    deckCulledByLimitGet(
      deck,
      deckHardLimit
    )
  )
    .then(
      (
        deck
      ) => {

        return deckSpoofedGet(
          deck,
          spoofFlag
        );
      }
    )
    .then(
      (
        deck
      ) => {

        return deckActorImageIdsAssignedGet(
          deck,
          genre,
          db
        );
      }
    );
};

const deckLocalRandomGet = async (
  genre,
  db,
  deckHardLimit,
  spoofFlag
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

  deck = await deckLocalPreRenderHandledGet(
    deck,
    genre,
    db,
    deckHardLimit,
    spoofFlag
  );

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
  plotLimit,
  deckHardLimit,
  spoofFlag
) => {

  let deck;

  switch (
    true
  ) {

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
        db,
        5,
        spoofFlag
      );

    case (
      !!text.match(
        /^random:local$/
      )
    ) :

      return deckLocalRandomGet(
        genre,
        db,
        5,
        spoofFlag
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
              plotLimit,
              deckHardLimit,
              spoofFlag
            );
          }
        );

    default :

      return deckGetFn(
        text,
        genre,
        db,
        plotLimit,
        deckHardLimit,
        spoofFlag
      );
  }
};

const outputGet = async (
  text,
  genre,
  db,
  plotLimit,
  deckHardLimit,
  spoofFlag,
  outputType
) => {

  const deck = await deckGet(
    text,
    genre,
    db,
    plotLimit,
    deckHardLimit,
    spoofFlag
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
  plotLimit = 10,
  deckHardLimit = 5,
  spoofFlag = true,
  outputType = 'movie',
  createFlag = true
) => {

  let output = await outputGet(
    text,
    genre,
    db,
    plotLimit,
    deckHardLimit,
    spoofFlag,
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
