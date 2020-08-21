'use strict';

import cardsBasicGet from './cardsBasicGet';
import cardsImageDataAssignedGet from 
  './cardsImageDataAssignedGet';

export default async (
  segments,
  genre,
  db
) => {

  let cards = cardsBasicGet(
    segments
  );

  cards = await cardsImageDataAssignedGet(
    cards,
    genre,
    db
  );

  return (
    cards
  );
};
