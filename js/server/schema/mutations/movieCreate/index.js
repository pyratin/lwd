'use strict';

import {
  ObjectID
} from 'mongodb';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import segmentsGet from '../fns/segmentsGet';
import cardsGet from '../fns/cardsGet';
import gifGet from '../fns/gifGet';
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

const process = async (
  text,
  genre,
  db,
  req
) => {

  let movieDataBasic = await movieDataBasicGet(
    text
  );

  if (
    !movieDataBasic.plot ||
    !movieDataBasic.cast
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

  const segments = segmentsGet(
    movieDataBasic.plot,
    characters
  );

  characters = characters.reduce(
    (
      memo,
      character
    ) => {

      const text = character.levenMatchText ||
        character.text;

      return [
        ...memo,
        {
          ...character,
          text
        }
      ];
    },
    []
  );

  const cards = await cardsGet(
    segments,
    genre,
    db
  );

  const base64 = await gifGet(
    movieDataBasic.title,
    movieDataBasic.poster,
    cards
  );

  const movie = await movieCreate(
    movieDataBasic.title,
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

export default async (
  text,
  genre,
  db,
  req
) => {

  let title = await titleGet(
    text
  );

  return process(
    title,
    genre,
    db,
    req
  );
};
