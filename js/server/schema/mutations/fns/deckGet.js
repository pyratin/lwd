'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import charactersStarringCardIndexesAssignedGet 
  from './charactersStarringCardIndexesAssignedGet';
import deckSplashCharactersGenderAssignedGet 
  from './deckSplashCharactersGenderAssignedGet';
import deckSpoofedGet from './deckSpoofedGet';
import deckActorImageIdsAssignedGet
  from './deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet
  from './deckRenderDetailsAssignedGet';
import deckGifyUrlsAssignedGet from 
  './deckGifyUrlsAssignedGet';
import deckSpoofableAssignedGet 
  from './deckSpoofableAssignedGet';

export default async (
  title,
  genre,
  db,
  plotLimit,
  castRoleLimit
) => {

  let movieDataBasic = await movieDataBasicGet(
    title,
    plotLimit,
    castRoleLimit
  );

  if (
    !movieDataBasic?.plot ||
    !movieDataBasic?.cast
  ) {

    return (
      {}
    );
  }

  let cards;

  let characters;

  characters = await charactersGet(
    movieDataBasic.cast,
    movieDataBasic.plot,
    movieDataBasic.plotText
  );

  cards = cardsGet(
    movieDataBasic.plot,
    characters,
    genre,
    db
  );

  characters = charactersStarringCardIndexesAssignedGet(
    characters,
    cards
  );

  let deck = {
    splash: {
      title: movieDataBasic.title,
      poster: movieDataBasic.poster,
      characters
    },
    cards
  };

  deck = await deckSplashCharactersGenderAssignedGet(
    deck
  );

  deck = deckSpoofedGet(
    deck,
    genre
  );

  deck = await deckActorImageIdsAssignedGet(
    deck,
    genre,
    db
  );

  deck = deckRenderDetailsAssignedGet(
    deck
  );

  deck = await deckGifyUrlsAssignedGet(
    deck
  );

  deck = deckSpoofableAssignedGet(
    deck
  );

  return (
    deck
  );
};
