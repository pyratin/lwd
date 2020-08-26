'use strict';

import plotNNPsGet from './plotNNPsGet';
import castNNPsGet from './castNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

const matchesDataAssignedGet = (
  matches,
  _NNPs,
  __NNPs,
  cast
) => {

  return matches.reduce(
    (
      memo,
      _cross
    ) => {

      const NNP = _NNPs[
        _cross.NNPIndex
      ];

      const _NNP = __NNPs[
        _cross._NNPIndex
      ];

      const _cast = cast[
        _NNP.castIndex
      ];

      return [
        ...memo,
        {
          _cross,
          NNP,
          _NNP,
          _cast
        }
      ];
    },
    []
  );
};

const matchesSortedGet = (
  matches
) => {

  return matches.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a._NNP.distance >
          b._NNP.distance
        ) :

          return 1;

        case (
          b._NNP.distance >
          a._NNP.distance
        ) :

          return -1;

        case (
          a._NNP.castIndex >
          b._NNP.castIndex
        ) :

          return 1;

        case (
          b._NNP.castIndex >
          a._NNP.castIndex
        ) :

          return -1;

        case (
          a._NNP.possessive &&
          !b._NNP.possessive
        ) :

          return 1;

        case (
          b._NNP.possessive &&
          !a._NNP.possessive
        ) :

          return -1;
      }
    }
  );
};

const matchExistsGet = (
  match,
  _matches
) => {

  return _matches.find(
    (
      _match
    ) => {

      const _matchText = _match._cross._text ||
        _match._cross.text;

      const matchText = match._cross._text ||
        match._cross.text;

      return (
        _matchText ===
        matchText
      );
    }
  );
};

const matchesUniqueGet = (
  matches
) => {

  return matches.reduce(
    (
      memo,
      match
    ) => {

      const exists = matchExistsGet(
        match,
        memo
      );

      if (
        !exists
      ) {

        return [
          ...memo,
          match
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

export default (
  cast,
  plot
) => {

  const NNPs = plotNNPsGet(
    plot
  );

  const _NNPs = castNNPsGet(
    cast
  );

  let matches = NNPsCrossMatchesGet(
    NNPs,
    _NNPs
  );

  matches = matchesDataAssignedGet(
    matches,
    NNPs,
    _NNPs,
    cast
  );

  matches = matchesSortedGet(
    matches
  );

  matches = matchesUniqueGet(
    matches
  );

  return (
    matches
  );
};
