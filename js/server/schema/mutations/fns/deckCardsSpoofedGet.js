'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';
import cardsCharactersAssignedGet
  from './cardsCharactersAssignedGet';

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

const cardsSpoofedGetFn = (
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

  return {
    ...card,
    text
  };
};

const cardsSpoofedGet = (
  _cards,
  _characters
) => {

  return _cards.reduce(
    (
      memo,
      _card
    ) => {

      const card = cardsSpoofedGetFn(
        _card,
        _characters
      );

      return [
        ...memo,
        card
      ];
    },
    []
  );
};

const cardsCharacterAssignedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const character = card.characters
        .find(
          (
            character
          ) => {

            return (
              character._text ===
              card.character.text
            );
          }
        );

      return [
        ...memo,
        {
          ...card,
          character
        }
      ];
    },
    []
  );
};

export default (
  _cards,
  _characters
) => {

  let cards = cardsSpoofedGet(
    _cards,
    _characters
  );

  cards = cardsCharactersAssignedGet(
    cards,
    _characters
  );

  cards = cardsCharacterAssignedGet(
    cards
  );

  return (
    cards
  );
};
