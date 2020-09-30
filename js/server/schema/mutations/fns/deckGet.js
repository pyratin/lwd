'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import charactersMetaAssignedGet 
  from './charactersMetaAssignedGet';
import charactersGenderAssignedGet
  from './charactersGenderAssignedGet';
import deckSpoofedGet from './deckSpoofedGet';
import deckActorImageIdsAssignedGet
  from './deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet
  from './deckRenderDetailsAssignedGet';
import deckGifyUrlsAssignedGet from 
  './deckGifyUrlsAssignedGet';
import deckSpoofableAssignedGet 
  from './deckSpoofableAssignedGet';

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

  return {
    splash: {
      title: movieDataBasic.title,
      poster: movieDataBasic.poster,
      characters
    },
    cards
  };
};

export default async (
  input,
  spoofFlag,
  hero,
  genre,
  plotLimit,
  db,
  buildFlag
) => {

  let deck = (
    buildFlag
  ) ?
    await deckBuiltGet(
      input,
      plotLimit
    ) :
    input;

  deck = deckSpoofedGet(
    deck,
    spoofFlag,
    hero
  );
  console.log(deck.splash.characters);

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
