'use strict';

import cardsActorImageIdAssignedGet from
  './cardsActorImageIdAssignedGet';
import cardsGifyUrlAssignedGet from 
  './cardsGifyUrlAssignedGet';

export default async (
  _cards,
  genre,
  db,
  gifyUrlsAssign = true
) => {

  let cards = _cards;

  if (
    genre
  ) {

    cards = await cardsActorImageIdAssignedGet(
      _cards,
      genre,
      db
    );
  }

  if (
    gifyUrlsAssign
  ) {

    cards = await cardsGifyUrlAssignedGet(
      cards
    );
  }

  return (
    cards
  );
};
