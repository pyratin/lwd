'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import cardsGet from './cardsGet';
import deckGet from './deckGet';

const cardTextFragmentsCollapsedGetFn = (
  card
) => {

  const text = card.text.reduce(
    (
      memo,
      fragment
    ) => {

      return `${memo}${fragment.text}`;
    },
    ''
  );

  return {
    ...card,
    text
  };
};

const cardTextFragmentsCollapsedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      return [
        ...memo,
        cardTextFragmentsCollapsedGetFn(
          card
        )
      ];
    },
    []
  );
};

export default async (
  movie,
  db
) => {

  let characters = await charactersGet(
    movie.cast,
    movie.plot,
    movie.plotText
  );

  const segments = segmentsGet(
    movie.plot,
    characters
  );

  const cards = await cardsGet(
    segments
  );

  let deck = await deckGet(
    cards,
    db
  );

  deck = cardTextFragmentsCollapsedGet(
    deck
  );

  console.log(
    JSON.stringify(
      deck,
      null,
      2
    )
  );

  return (
    deck
  );
};
