'use strict';

import cardsActorImageIdAssignedGet from
  './cardsActorImageIdAssignedGet';
import cardsGifyUrlAssignedGet from 
  './cardsGifyUrlAssignedGet';

export default async (
  _cards,
  genre,
  db
) => {

  let cards = await cardsActorImageIdAssignedGet(
    _cards,
    genre,
    db
  );

  cards = await cardsGifyUrlAssignedGet(
    cards
  );

  return (
    cards
  );
};
