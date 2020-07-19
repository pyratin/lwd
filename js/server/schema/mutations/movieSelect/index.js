'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import cardsGet from '../fns/cardsGet';
import gifGet from '../fns/gifGet';
import {
  movieCreate
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';

export default async (
  title,
  db
) => {

  let movieDataBasic = await movieDataBasicGet(
    title
  );

  const cards = await cardsGet(
    movieDataBasic,
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
