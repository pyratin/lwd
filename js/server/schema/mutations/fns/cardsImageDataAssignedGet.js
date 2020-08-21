'use strict';

import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyUrlAssignedGet from 
  './cardsGifyUrlAssignedGet';

export default async (
  _cards,
  genre,
  db
) => {

  let cards = await cardsActorReplacedGet(
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
