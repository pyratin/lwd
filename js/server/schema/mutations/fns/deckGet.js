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
import cardsRenderedGet from './cardsRenderedGet';
import splashRenderedGet from './splashRenderedGet';

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

const deckBase64AssignedGet = async (
  _deck,
  db
) => {

  const splashBase64 = await splashRenderedGet(
    _deck.splash,
    db
  );

  const cardBase64s = await cardsRenderedGet(
    _deck.cards,
    db
  );

  const cards = _deck.cards
    .map(
      (
        card,
        index
      ) => {

        return {
          ...card,
          base64: cardBase64s[
            index
          ]
            .slice(0, 10)
        };
      }
    );

  let deck = {
    splash: {
      ..._deck.splash,
      base64: splashBase64
    },
    cards
  };

  return (
    deck
  );
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

  deck = await deckBase64AssignedGet(
    deck,
    db
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
