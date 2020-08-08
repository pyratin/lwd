'use strict';

import NNPsGet from './NNPsGet';

export default (
  cast
) => {

  return cast.reduce(
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
};
