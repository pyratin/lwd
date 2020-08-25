'use strict';

import NNPCrossMatchesGet from './NNPCrossMatchesGet';

export default (
  plotCharacters,
  castCharacters
) => {

  const matches = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let matches = NNPCrossMatchesGet(
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
