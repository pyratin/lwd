'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';

const _NNPsGet = (
  characters
) => {

  return characters.map(
    (
      {
        text: _text,
        _text: text
      },
      index
    ) => {

      return {
        text,
        _text,
        index
      };
    }
  );
};

const deckCardsSpoofedGetFn = (
  card,
  characters
) => {

  const NNPs = plotNNPsGet(
    [
      card
    ]
  );

  const _NNPs = _NNPsGet(
    characters
  );

  const matches = NNPsCrossMatchesGet(
    NNPs,
    _NNPs,
    true
  );

  const text = matches.reduce(
    (
      memo,
      match
    ) => {

      const NNP = NNPs[
        match.NNPIndex
      ];

      const _distance = NNP.distance;

      const distanceOffset = memo.length - card.text.length;

      const distance = _distance + distanceOffset;

      const _NNP = _NNPs[
        match._NNPIndex
      ];

      const name = _NNP.text;

      const spoofName = _NNP._text;

      const text = [
        ...memo.slice(
          0, 
          distance
        ),
        spoofName,
        ...memo.slice(
          distance +
          name.length
        )
      ]
        .join('');

      return (
        text
      );
    },
    card.text
  );

  console.log('---------------');
  console.log(text);
};

export default (
  cards,
  _characters
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const characters = deckCardsSpoofedGetFn(
        card,
        _characters
      );
    },
    []
  );
};
