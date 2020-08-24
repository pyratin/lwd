'use strict';

import plotNNPsGet from './plotNNPsGet';
import castNNPsGet from './castNNPsGet';
import NNPCrossMatchGet from './NNPCrossMatchGet';

const NNPCrossMatchesGetFn = (
  plotCharacter,
  castCharacters
) => {

  const matches = castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      const match = NNPCrossMatchGet(
        plotCharacter.text,
        castCharacter.text
      );

      if (
        match
      ) {

        return [
          ...memo ||
          [],
          {
            ...castCharacter,
            ...match
          }
        ];
      }

      return (
        memo
      );
    },
    null
  );

  return (
    matches
  );
};

const NNPCrossMatchesGet = (
  plotCharacters,
  castCharacters
) => {

  const matches = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let matches = NNPCrossMatchesGetFn(
        plotCharacter,
        castCharacters
      );

      if (
        matches
      ) {

        return [
          ...memo,
          ...matches
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    matches
  );
};
const charactersSortedGet = (
  castCharacters
) => {

  return castCharacters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.possessive &&
          !b.possessive
        ) :

          return 1;

        case (
          b.possessive &&
          !a.possessive
        ) :

          return -1;

        case (
          a.distance >
          b.distance
        ) :

          return 1;

        case (
          b.distance >
          a.distance
        ) :

          return -1;

        case (
          a.castIndex >
          b.castIndex
        ) :

          return 1;

        case (
          b.castIndex >
          a.castIndex
        ) :

          return -1;
      }
    }
  );
};

const characterExistsGet = (
  character,
  characters
) => {

  return characters.reduce(
    (
      memo,
      _character
    ) => {

      const exists = (
        character.text ===
        _character.text
      );

      if (
        !memo &&
        exists
      ) {

        return (
          true
        );
      }

      return (
        memo
      );
    },
    false
  );
};

const charactersUniqueMatchesGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      const exists = characterExistsGet(
        castCharacter,
        memo
      );

      if (
        !exists
      ) {

        return [
          ...memo,
          castCharacter
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const charactersCastDataAssignedGet = (
  characters,
  cast
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...memo,
        {
          ...character,
          ...cast[
            character.castIndex
          ]
        }
      ];
    },
    []
  )
    .map(
      (
        character
      ) => {

        delete character.distance;

        return (
          character
        );
      }
    );
};

export default (
  cast,
  plot
) => {

  const plotCharacters = plotNNPsGet(
    plot
  );

  const castCharacters = castNNPsGet(
    cast
  );

  let characters = NNPCrossMatchesGet(
    plotCharacters,
    castCharacters
  );

  characters = charactersSortedGet(
    characters
  );

  characters = charactersUniqueMatchesGet(
    characters
  );

  characters = charactersCastDataAssignedGet(
    characters,
    cast
  );

  return (
    characters
  );
};
