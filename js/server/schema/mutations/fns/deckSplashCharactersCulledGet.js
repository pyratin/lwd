'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

const NNPsGet = (
  cards
) => {

  return plotNNPsGet(
    cards
  );
};

const _NNPsGet = (
  characters
) => {

  return characters.map(
    (
      {
        text
      },
      index
    ) => {

      return {
        text,
        index
      };
    }
  );
};

export default (
  _characters,
  cards
) => {

  const NNPs = NNPsGet(
    cards
  );

  const _NNPs = _NNPsGet(
    _characters
  );

  const matches = NNPsCrossMatchesGet(
    NNPs,
    _NNPs,
    true
  );

  const characters = _characters.filter(
    (
      _character
    ) => {

      const exists = matches.find(
        (
          match
        ) => {

          return (
            match.text ===
            _character.text
          );
        }
      );

      return (
        exists
      );
    }
  );

  return (
    characters
  );
};
