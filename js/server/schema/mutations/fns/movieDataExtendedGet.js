'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsGet from './cardsGet';
import cardsRenderedGet from './cardsRenderedGet';

export default async (
  movie,
  db
) => {

  let characters = await charactersGet(
    movie.cast,
    movie.plot,
    movie.plotText
  );

  const segments = segmentsGet(
    movie.plot,
    characters
  );

  let cards = await cardsGet(
    segments,
    db
  );

  const gif = await cardsRenderedGet(
    movie.title,
    movie.poster,
    cards
  );

  return {
    title: movie.title,
    gif
  };
};
