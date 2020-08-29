'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

const cardsCulledGet = (
  _cards,
  cullFlag
) => {

  const cards = (
    _cards
  ) &&
    _cards.reduce(
      (
        memo,
        _card
      ) => {

        if (
          (
            cullFlag &&
            memo.length >= 
            3
          ) &&
          (
            !memo[
              memo.length - 1
            ]?.text
              .match(/\s...,$/)
          ) &&
          (
            (
              memo[
                memo.length - 1
              ]?.paragraphIndex !==
              _card.paragraphIndex
            ) ||
            (
              memo.length >=
              6
            )
          )
        ) {

          return (
            memo
          );
        }

        return [
          ...memo,
          _card
        ];
      },
      []
    );

  return (
    cards
  );
};

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

const charactersCulledGet = (
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

export default (
  {
    splash,
    cards: _cards
  },
  cullFlag
) => {

  let cards = cardsCulledGet(
    _cards,
    cullFlag
  );

  let characters = charactersCulledGet(
    splash.characters,
    cards
  );

  return {
    splash: {
      ...splash,
      characters
    },
    cards
  };
};
