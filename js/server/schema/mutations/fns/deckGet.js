'use strict';

import deckSplashCharactersGet from 
  './deckSplashCharactersGet';
import deckCardsGet from './deckCardsGet';
import deckCardsCulledGet from './deckCardsCulledGet';
import deckSplashCharactersCulledGet 
  from './deckSplashCharactersCulledGet';
import deckCardsActorImageIdAssignedGet 
  from './deckCardsActorImageIdAssignedGet';
import deckCharactersActorImageIdAssignedGet from
  './deckCharactersActorImageIdAssignedGet';
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

  cards = await deckCardsActorImageIdAssignedGet(
    cards,
    genre,
    db
  );

  characters = deckCharactersActorImageIdAssignedGet(
    characters,
    cards
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
