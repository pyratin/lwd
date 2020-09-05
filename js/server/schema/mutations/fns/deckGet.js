'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import charactersGet from '../fns/charactersGet';
import cardsGet from '../fns/cardsGet';
import deckRolesGet from './deckRolesGet';
import deckCulledByLimitGet 
  from './deckCulledByLimitGet';
import deckCulledByCategoryGet
  from './deckCulledByCategoryGet';
import deckActorImageIdsAssignedGet 
  from './deckActorImageIdsAssignedGet';
import deckRenderDetailsAssignedGet
  from './deckRenderDetailsAssignedGet';
import deckCardsGifyUrlAssignedGet from 
  './deckCardsGifyUrlAssignedGet';
import cardsRenderTextAssignedGet 
  from './cardsRenderTextAssignedGet';

export default async (
  title,
  genre,
  db,
  deckHardLimit,
  deckLimitByRolesFlag
) => {

  let movieDataBasic = await movieDataBasicGet(
    title
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

  characters = charactersGet(
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

  let roles = await deckRolesGet(
    title,
    characters
  );

  (
    {
      cards,
      splash: {
        characters
      }
    }  = deckCulledByLimitGet(
      cards,
      null,
      deckHardLimit,
      deckLimitByRolesFlag,
      characters
    )
  );

  (
    {
      cards,
      splash: {
        characters
      }
    } = await deckCulledByCategoryGet(
      cards,
      movieDataBasic.plotText,
      characters
    )
  );

  (
    {
      cards,
      splash: {
        characters
      }
    } = await deckActorImageIdsAssignedGet(
      cards,
      genre,
      db,
      characters
    )
  );

  (
    {
      cards,
      splash: {
        characters
      }
    } = deckRenderDetailsAssignedGet(
      characters,
      cards
    )
  );

  cards = await deckCardsGifyUrlAssignedGet(
    cards
  );

  cards = cardsRenderTextAssignedGet(
    cards
  );

  return {
    splash: {
      title: movieDataBasic.title,
      poster: movieDataBasic.poster,
      characters
    },
    cards,
    roles
  };
};
