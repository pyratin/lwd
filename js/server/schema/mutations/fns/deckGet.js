'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import deckCulledByLimitGet 
  from './deckCulledByLimitGet';
import deckActorImageIdsAssignedGet 
  from './deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet
  from './deckRenderDetailsAssignedGet';
import deckGifyUrlsAssignedGet from 
  './deckGifyUrlsAssignedGet';

export default async (
  title,
  genre,
  db,
  plotLimit,
  deckHardLimit
) => {

  let movieDataBasic = await movieDataBasicGet(
    title,
    plotLimit
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

  cards = await cardsGet(
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

  return (
    deck
  );
};
