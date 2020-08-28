'use strict';

import {
  ObjectID
} from 'mongodb';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import deckGet from '../fns/deckGet';
import gifRenderedGet from '../fns/gifRenderedGet';
import {
  movieCreate as movieCreateFn
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';
import movieTitleRandomGet from 
  '../fns/movieTitleRandomGet';
import {
  hostUrlGet
} from '~/js/server/fns/variable';

const titleGet = async (
  text
) => {

  const match = text.match(
    /^random:(english|hindi|tamil)$/
  );

  const title = (
    match
  ) ?
    await movieTitleRandomGet(
      text.split(
        /:/
      )[
        1
      ]
    ) :
    Promise.resolve(
      text
    );

  return (
    title
  );
};

const movieCreate = async (
  title,
  base64,
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
        title,
        base64,
        path
      }
    },
    undefined,
    db
  );
};

const successHandle = async (
  title,
  base64,
  db,
  req
) => {

  const movie = await movieCreate(
    title,
    base64,
    db,
    req
  );

  await movieWrite(
    movie
  );

  return (
    movie
  );
};

const render = async (
  title,
  deck,
  db,
  req
) => {

  const base64 = await gifRenderedGet(
    deck,
    db
  );

  if (
    title &&
    base64
  ) {

    return successHandle(
      title,
      base64,
      db,
      req
    );
  }

  return {
    title
  };
};

const processFn = async (
  text,
  genre,
  db,
  req,
  cullFlag,
  renderFlag
) => {

  let movieDataBasic = await movieDataBasicGet(
    text,
    cullFlag
  );

  if (
    !movieDataBasic?.plot ||
    !movieDataBasic?.cast
  ) {

    return (
      {}
    );
  }

  let characters = await charactersGet(
    movieDataBasic.cast,
    movieDataBasic.plot,
    movieDataBasic.plotText
  );

  const cards = await cardsGet(
    movieDataBasic.plot,
    characters,
    genre,
    db
  );

  const deck = deckGet(
    movieDataBasic.title,
    movieDataBasic.poster,
    cards
  );

  if (
    renderFlag
  ) {

    return render(
      movieDataBasic.title,
      deck,
      db,
      req
    );
  }

  return (
    deck
  );
};

export default async (
  text,
  genre,
  db,
  req,
  cullFlag = true,
  renderFlag = true
) => {

  let title = await titleGet(
    text
  );

  const movie = await processFn(
    title,
    genre,
    db,
    req,
    cullFlag,
    renderFlag
  );

  if (
    text.match(/^random:/) &&
    !movie.base64
  ) {

    return process(
      text,
      genre,
      db,
      req,
      cullFlag,
      renderFlag
    );
  }

  return (
    movie
  );
};
