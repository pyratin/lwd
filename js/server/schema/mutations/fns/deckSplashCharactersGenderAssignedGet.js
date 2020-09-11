'use strict';

import actorsGenderAssignedGet 
  from './actorsGenderAssignedGet';

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
          role: actor.gender,
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

export default async (
  deck
) => {

  let actors = actorsFlatlistGet(
    deck.splash.characters
  );

  actors = await actorsGenderAssignedGet(
    actors
  );

  let characters = charactersActorGenderAssignedGet(
    deck.splash.characters,
    actors
  );

  return {
    ...deck,
    splash: {
      ...deck.splash,
      characters
    }
  };
};
