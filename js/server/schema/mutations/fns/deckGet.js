'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import charactersMetaAssignedGet 
  from './charactersMetaAssignedGet';
import charactersGenderAssignedGet
  from './charactersGenderAssignedGet';
import deckSpoofableGet 
  from './deckSpoofableGet';
import deckSpoofedGet from './deckSpoofedGet';
import deckActorImageIdsAssignedGet
  from './deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet
  from './deckRenderDetailsAssignedGet';
import cardsGifyUrlAssignedGet from 
  './cardsGifyUrlAssignedGet';

const deckPreBuiltGet = async (
  input,
  plotLimit
) => {

  if (
    typeof(
      input
    ) !== 'string'
  ) {

    return Promise.resolve(
      input
    );
  }

  let movieDataBasic = await movieDataBasicGet(
    input,
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

  let characters = await charactersGet(
    movieDataBasic.cast,
    movieDataBasic.plot,
    movieDataBasic.plotText
  );

  let cards = cardsGet(
    movieDataBasic.plot,
    characters
  );

  characters = await charactersGenderAssignedGet(
    characters
  );

  characters = await charactersMetaAssignedGet(
    characters,
    cards,
    movieDataBasic.title
  );

  cards = await cardsGifyUrlAssignedGet(
    cards
  );

  const spoofable = deckSpoofableGet(
    characters,
    cards
  );

  return {
    splash: {
      title: movieDataBasic.title,
      poster: movieDataBasic.poster,
      characters,
      spoofable
    },
    cards
  };
};

const deckPostProcessedGet = async (
  deck,
  spoofInput,
  genre,
  db
) => {

  if (
    !spoofInput ||
    !genre
  ) {

    return Promise.resolve(
      deck
    );
  }

  deck = deckSpoofedGet(
    deck,
    spoofInput
  );

  deck = await deckActorImageIdsAssignedGet(
    deck,
    genre,
    db
  );

  deck = deckRenderDetailsAssignedGet(
    deck
  );

  return (
    deck
  );
};

export default async (
  input,
  spoofInput,
  genre,
  plotLimit,
  db
) => {

  let deck = await deckPreBuiltGet(
    input,
    plotLimit
  );

  deck = await deckPostProcessedGet(
    deck,
    spoofInput,
    genre,
    db
  );

  return (
    deck
  );
};
