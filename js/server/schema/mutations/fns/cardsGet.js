'use strict';

import cardsCharacterAssignedGet from './cardsCharacterAssignedGet';
import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyAssignedGet from './cardsGifyAssignedGet';
import cardsTextCollapsedGet from 
  './cardsTextCollapsedGet';
import cardsRenderedGet from './cardsRenderedGet';

export default async (
  segments,
  db
) => {

  let cards = cardsCharacterAssignedGet(
    segments
  );

  cards = await cardsActorReplacedGet(
    cards,
    db
  );

  cards = await cardsGifyAssignedGet(
    cards
  );

  cards = cardsTextCollapsedGet(
    cards
  );

  cards = await cardsRenderedGet(
    cards
  );

  return (
    cards
  );
};
