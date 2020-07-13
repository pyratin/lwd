'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsGet from './cardsGet';

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

  //console.log(
    //JSON.stringify(
      //cards,
      //null,
      //2
    //)
  //);

  return (
    cards
  );
};
