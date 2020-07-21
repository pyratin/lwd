'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import segmentsGet from '../fns/segmentsGet';
import cardsGet from '../fns/cardsGet';
import gifGet from '../fns/gifGet';
import {
  movieCreate
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';
import movieTitleRandomGet from 
  '../fns/movieTitleRandomGet';

const titleGet = async (
  text
) => {

  const match = text.match(
    /^(english|hindi|tamil):\d{4}$/
  );

  const title = (
    match
  ) ?
    await movieTitleRandomGet(
      text
    ) :
    Promise.resolve(
      text
    );

  return (
    title
  );
};

const process = async (
  text,
  db
) => {

  let movieDataBasic = await movieDataBasicGet(
    text
  );

  let characters = await charactersGet(
    movieDataBasic.cast,
    movieDataBasic.plot,
    movieDataBasic.plotText
  );

  const segments = segmentsGet(
    movieDataBasic.plot,
    characters
  );

  const cards = await cardsGet(
    segments,
    db
  );

  const gif = await gifGet(
    movieDataBasic.title,
    movieDataBasic.poster,
    cards
  );

  const movie = await movieCreate(
    {
      title: movieDataBasic.title,
      gif
    },
    db
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
  db
) => {

  let title = await titleGet(
    text
  );

  return process(
    title,
    db
  );
};
