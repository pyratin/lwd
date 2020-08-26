'use strict';

import NNPsGet from './NNPsGet';
import NNPsUniqueGet from './NNPsUniqueGet';

export default (
  cast
) => {

  let castNNPs = cast.reduce(
    (
      _castMemo,
      _cast,
      castIndex
    ) => {

      const castCharacters = NNPsGet(
        _cast.role
      )
        .reduce(
          (
            castCharacterMemo,
            {
              text,
              distance
            }
          ) => {

            const possessive = !!_cast.role
              .match(
                new RegExp(
                  `
                    ${
                      text
                    }'s
                  `
                    .trim()
                )
              );

            return [
              ...castCharacterMemo,
              {
                text,
                castIndex,
                possessive,
                distance
              }
            ];
          },
          []
        );

      return [
        ..._castMemo,
        ...castCharacters
      ];
    },
    []
  );

  castNNPs = NNPsUniqueGet(
    castNNPs
  );

  castNNPs = castNNPs.map(
    (
      castNNP,
      index
    ) => {
  
      return {
        ...castNNP,
        index
      };
    }
  );

  return (
    castNNPs
  );
};
