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
import deckSpoofedGet from '../fns/deckSpoofedGet';
import deckActorImageIdsAssignedGet 
  from '../fns/deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet 
  from '../fns/deckRenderDetailsAssignedGet';
import deckGifyUrlsAssignedGet 
  from '../fns/deckGifyUrlsAssignedGet';
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

const deckLocalPreviewGet = async (
  skip,
  genre,
  db
) => {

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
  castRoleLimit
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
              castRoleLimit
            );
          }
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
        db,
        5
      );

    default :

      return deckGetFn(
        text,
        genre,
        db,
        plotLimit,
        castRoleLimit
      );
  }
};

const outputGet = async (
  text,
  genre,
  db,
  plotLimit,
  castRoleLimit,
  outputType
) => {

  const deck = await deckGet(
    text,
    genre,
    db,
    plotLimit,
    castRoleLimit
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
  input,
  db,
  req,
  plotLimit = 5,
  castRoleLimit = true
) => {

  const {
    genre = 'general',
    outputType = 'movie',
    createFlag = true
  } = input;

  let output = await outputGet(
    text,
    genre,
    db,
    plotLimit,
    castRoleLimit,
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
