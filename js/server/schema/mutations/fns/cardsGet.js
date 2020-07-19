'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsCharacterAssignedGet from './cardsCharacterAssignedGet';
import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyAssignedGet from './cardsGifyAssignedGet';
import cardsTextCollapsedGet from 
  './cardsTextCollapsedGet';

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

  return (
    cards
  );
};
