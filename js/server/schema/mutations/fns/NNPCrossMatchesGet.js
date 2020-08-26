'use strict';

import NNPCrossMatchGet from './NNPCrossMatchGet';

export default (
  NNP,
  _NNPs
) => {

  const matches = _NNPs.reduce(
    (
      memo,
      _NNP
    ) => {

      const match = NNPCrossMatchGet(
        NNP.text,
        _NNP.text
      );

      if (
        match
      ) {

        return [
          ...memo ||
          [],
          {
            ...match,
            NNPIndex: NNP.index,
            _NNPIndex: _NNP.index
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

