'use strict';

import NNPCrossMatchesGet from './NNPCrossMatchesGet';

export default (
  NNPs,
  _NNPs
) => {

  const matches = NNPs.reduce(
    (
      memo,
      NNP
    ) => {

      let matches = NNPCrossMatchesGet(
        NNP,
        _NNPs
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
