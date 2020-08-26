'use strict';

import plotNNPsGet from './plotNNPsGet';
import castNNPsGet from './castNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

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

  return characters.findIndex(
    (
      _character
    ) => {

      return (
        _character.text ===
        character.text
      );
    }
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

      const matchIndex = characterExistsGet(
        castCharacter,
        memo
      );

      if (
        matchIndex === 
        -1
      ) {

        return [
          ...memo,
          {
            ...castCharacter,
            characterMarkers: [
              castCharacter.characterMarkers
            ]
          }
        ];
      }

      return [
        ...memo.slice(
          0, matchIndex
        ),
        {
          ...memo[
            matchIndex
          ],
          characterMarkers: [
            ...memo[
              matchIndex
            ]
              .characterMarkers,
            castCharacter.characterMarkers
          ]
        },
        ...memo.slice(
          matchIndex + 1
        )
      ];
    },
    []
  );
};

const characterMarkersUniqueSet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      let characterMarkerStrings = castCharacter
        .characterMarkers
        .map(
          (
            characterMarker
          ) => {

            return JSON.stringify(
              characterMarker
            );
          }
        );

      characterMarkerStrings = [
        ...new Set(
          characterMarkerStrings
        )
      ];

      const characterMarkers = characterMarkerStrings
        .map(
          (
            characterMarkerString
          ) => {

            return JSON.parse(
              characterMarkerString
            );
          }
        );

      return [
        ...memo,
        {
          ...castCharacter,
          characterMarkers
        }
      ];
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

  let characters = NNPsCrossMatchesGet(
    plotCharacters,
    castCharacters
  );

  characters = charactersSortedGet(
    characters
  );

  characters = charactersUniqueMatchesGet(
    characters
  );

  characters = characterMarkersUniqueSet(
    characters
  );

  console.log(
    JSON.stringify(
      characters,
      null,
      2
    )
  );

  characters = charactersCastDataAssignedGet(
    characters,
    cast
  );

  return (
    characters
  );
};
