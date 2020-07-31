'use strict';

import cardsBasicGet from './cardsBasicGet';
import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyAssignedGet from './cardsGifyAssignedGet';

export default async (
  segments,
  genre,
  db
) => {

  let cards = cardsBasicGet(
    segments
  );

  cards = await cardsActorReplacedGet(
    cards,
    genre,
    db
  );

  cards = await cardsGifyAssignedGet(
    cards
  );

  return (
    cards
  );
};
