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
import deckGifyUrlsAssignedGet from 
  './deckGifyUrlsAssignedGet';

const deckBuiltGet = async (
  title,
  plotLimit
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

export default async (
  input,
  spoofInput,
  genre,
  plotLimit,
  db
) => {

  let deck = (
    typeof(
      input
    ) === 'string'
  ) ?
    await deckBuiltGet(
      input,
      plotLimit
    ) :
    input;

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

  deck = await deckGifyUrlsAssignedGet(
    deck
  );

  return (
    deck
  );
};
