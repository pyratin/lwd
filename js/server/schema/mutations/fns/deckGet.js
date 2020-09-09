'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import deckCulledByLimitGet 
  from './deckCulledByLimitGet';
import deckAsyncDataAssignedGet 
  from './deckAsyncDataAssignedGet';
import deckSpoofedGet from './deckSpoofedGet';
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
  castRoleLimit,
  deckHardLimit,
  spoofFlag
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

  let deck = {
    splash: {
      title: movieDataBasic.title,
      poster: movieDataBasic.poster,
      characters
    },
    cards
  };

  deck = deckCulledByLimitGet(
    deck,
    deckHardLimit
  );

  deck = await deckAsyncDataAssignedGet(
    deck,
    genre,
    db
  );

  deck = deckSpoofedGet(
    deck,
    spoofFlag
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
