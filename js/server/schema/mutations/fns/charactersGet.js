'use strict';

import plotNNPsGet from './plotNNPsGet';
import castNNPsGet from './castNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';
import actorsGenderAssignedGet 
  from './actorsGenderAssignedGet';
import charactersCulledByCategoryGet
  from './charactersCulledByCategoryGet';

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

const actorsFlatlistGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            character.actor.text
          );
        }
      );

      if (
        !exists
      ) {

        return [
          ...memo,
          character.actor
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const charactersActorGenderAssignedGet = (
  characters,
  actors
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const actor = actors.find(
        (
          actor
        ) => {

          return (
            actor.text ===
            character.actor.text
          );
        }
      );

      return [
        ...memo,
        {
          ...character,
          actor: {
            ...character.actor,
            gender: actor.gender
          }
        }
      ];
    },
    []
  );
};

export default async (
  cast,
  plot,
  plotText
) => {

  const NNPs = plotNNPsGet(
    plot
  );

  const _NNPs = castNNPsGet(
    cast
  );

  let matches = NNPsCrossMatchesGet(
    NNPs,
    _NNPs,
    false
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

  let characters = charactersGet(
    matches,
    cast
  );

  let actors = actorsFlatlistGet(
    characters
  );

  actors = await actorsGenderAssignedGet(
    actors
  );

  characters = charactersActorGenderAssignedGet(
    characters,
    actors
  );

  characters = await charactersCulledByCategoryGet(
    characters,
    plotText
  );

  return (
    characters
  );
};
