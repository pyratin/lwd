'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsGet from './cardsGet';
import deckGet from './deckGet';

export default async (
  movie
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

  const cards = cardsGet(
    segments
  );

  //let deck = deckGet(
    //cards
  //);
};
