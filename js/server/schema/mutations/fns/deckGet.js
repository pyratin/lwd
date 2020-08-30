'use strict';

import deckSplashCharactersGet from 
  './deckSplashCharactersGet';
import deckCardsGet from './deckCardsGet';
import deckCardsCulledGet from './deckCardsCulledGet';
import deckSplashCharactersCulledGet 
  from './deckSplashCharactersCulledGet';
import charactersActorImageIdAssignedGet from
  './charactersActorImageIdAssignedGet';
import cardsActorImageIdAssignedGet 
  from './cardsActorImageIdAssignedGet';
import cardsGifyUrlAssignedGet from 
  './cardsGifyUrlAssignedGet';

export default async (
  title,
  poster,
  _cards,
  genre,
  db
) => {

  let characters = deckSplashCharactersGet(
    _cards
  );

  let cards = deckCardsGet(
    _cards,
    characters
  );

  cards = deckCardsCulledGet(
    cards
  );

  characters = deckSplashCharactersCulledGet(
    characters,
    cards
  );

  characters = await charactersActorImageIdAssignedGet(
    characters,
    genre,
    db
  );

  cards = cardsActorImageIdAssignedGet(
    cards,
    characters
  );

  cards = await cardsGifyUrlAssignedGet(
    cards
  );

  return {
    splash: {
      title,
      poster,
      characters
    },
    cards
  };
};
