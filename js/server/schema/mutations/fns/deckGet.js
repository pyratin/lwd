'use strict';

import deckSplashCharactersGet from 
  './deckSplashCharactersGet';
import deckCardsGet from './deckCardsGet';
import deckCardsCulledGet from './deckCardsCulledGet';
import deckSplashCharactersCulledGet 
  from './deckSplashCharactersCulledGet';
import deckSplashCharactersRenderDetailsAssignedGet
  from './deckSplashCharactersRenderDetailsAssignedGet';
import deckCardsActorImageIdAssignedGet 
  from './deckCardsActorImageIdAssignedGet';
import deckSplashCharactersActorImageIdAssignedGet from
  './deckSplashCharactersActorImageIdAssignedGet';
import deckCardsRenderDetailsAssignedGet
  from './deckCardsRenderDetailsAssignedGet';
import deckCardsGifyUrlAssignedGet from 
  './deckCardsGifyUrlAssignedGet';

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

  characters = deckSplashCharactersActorImageIdAssignedGet(
    characters,
    cards
  );

  characters = deckSplashCharactersRenderDetailsAssignedGet(
    characters
  );

  cards = deckCardsRenderDetailsAssignedGet(
    cards,
    characters
  );

  cards = await deckCardsGifyUrlAssignedGet(
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
