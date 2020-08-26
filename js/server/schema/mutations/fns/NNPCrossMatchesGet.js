'use strict';

import NNPCrossMatchGet from './NNPCrossMatchGet';

export default (
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
            ...match,
            characterMarkers: {
              paragraphIndex: plotCharacter.paragraphIndex,
              sentenceIndex: plotCharacter.sentenceIndex,
              tokenIndex: plotCharacter.index,
              distance: plotCharacter.distance
            }
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

