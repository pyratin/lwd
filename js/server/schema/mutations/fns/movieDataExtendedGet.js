'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsGet from './cardsGet';
import deckGet from './deckGet';

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

  const cards = cardsGet(
    segments,
    db
  );

  //let deck = deckGet(
    //cards
  //);

  //console.log(
    //JSON.stringify(
      //cards,
      //null,
      //2
    //)
  //);

  //return (
    //deck
  //);
};
