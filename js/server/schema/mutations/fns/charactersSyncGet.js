'use strict';

import plotNNPsGet from './plotNNPsGet';
import castNNPsGet from './castNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

const matchesDataAssignedGet = (
  matches,
  _NNPs,
  __NNPs
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

      return [
        ...memo,
        {
          _cross,
          NNP,
          _NNP
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
          a._NNP.possessive &&
          !b._NNP.possessive
        ) :

          return 1;

        case (
          b._NNP.possessive &&
          !a._NNP.possessive
        ) :

          return -1;

        case(
          a._NNP.sentenceIndex >
          b._NNP.sentenceIndex
        ) :

          return 1;

        case (
          b._NNP.sentenceIndex >
          a._NNP.sentenceIndex
        ) :

          return -1;

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

      const matchText = match._cross.text;

      const _matchText = _match._cross.text;

      return (
        (
          _matchText ===
          matchText
        )
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

const matchesUniqueSortedGet = (
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
          a._NNP.castIndex >
          b._NNP.castIndex
        ) :

          return 1;

        case (
          b._NNP.castIndex >
          a._NNP.castIndex
        ) :

          return -1;
      }
    }
  );
};

const charactersGet = (
  matches,
  cast
) => {

  return matches.reduce(
    (
      memo,
      {
        _cross: {
          text
        },
        _NNP: {
          castIndex
        }
      }
    ) => {

      const character = {
        text,
        actor: cast[
          castIndex
        ]
          .actor,
        castIndex
      };

      return [
        ...memo,
        character
      ];
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
    _NNPs
  );

  matches = matchesSortedGet(
    matches
  );

  matches = matchesUniqueGet(
    matches
  );

  matches = matchesUniqueSortedGet(
    matches
  );

  const characters = charactersGet(
    matches,
    cast
  );

  return (
    characters
  );
};