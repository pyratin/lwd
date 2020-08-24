'use strict';

import cardsSyncGet from './cardsSyncGet';
import cardsAsyncGet from './cardsAsyncGet';

export default async (
  plot,
  characters,
  genre,
  db,
  gifyUrlsAssign
) => {

  let cards = cardsSyncGet(
    plot,
    characters
  );

  cards = await cardsAsyncGet(
    cards,
    genre,
    db,
    gifyUrlsAssign
  );

  return (
    cards
  );
};
