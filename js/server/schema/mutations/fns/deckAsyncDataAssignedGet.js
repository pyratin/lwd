'use strict';

import actorsGenderAssignedGet 
  from './actorsGenderAssignedGet';
import deckActorImageIdsAssignedGet 
  from './deckActorImageIdsAssignedGet';

const actorsFlatlistGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            character.actor.text
          );
        }
      );

      if (
        !exists
      ) {

        return [
          ...memo,
          character.actor
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const charactersActorGenderAssignedGet = (
  characters,
  actors
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const actor = actors.find(
        (
          actor
        ) => {

          return (
            actor.text ===
            character.actor.text
          );
        }
      );

      return [
        ...memo,
        {
          ...character,
          actor: {
            ...character.actor,
            gender: actor.gender
          }
        }
      ];
    },
    []
  );
};

const deckSplashCharactersGenderAssignedGet = async (
  characters
) => {

  let actors = actorsFlatlistGet(
    characters
  );

  actors = await actorsGenderAssignedGet(
    actors
  );

  characters = charactersActorGenderAssignedGet(
    characters,
    actors
  );

  return (
    characters
  );
};

export default async (
  _deck,
  genre,
  db
) => {

  const characters = 
  await deckSplashCharactersGenderAssignedGet(
    _deck.splash.characters
  );

  const deck = await deckActorImageIdsAssignedGet(
    {
      ..._deck,
      splash: {
        ..._deck.splash,
        characters
      }
    },
    genre,
    db
  );

  return (
    deck
  );
};
