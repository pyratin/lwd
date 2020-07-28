'use strict';

import cardsCharacterAssignedGet from './cardsCharacterAssignedGet';
import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyAssignedGet from './cardsGifyAssignedGet';
import cardsTextCollapsedGet from 
  './cardsTextCollapsedGet';

export default async (
  segments,
  genre,
  db
) => {

  let cards = cardsCharacterAssignedGet(
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

  cards = cardsTextCollapsedGet(
    cards
  );

  return (
    cards
  );
};
