'use strict';

const cardsTextCollapsedGetFn = (
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

const cardsTextCollapsedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      return [
        ...memo,
        {
          ...cardsTextCollapsedGetFn(
            card
          )
        }
      ];
    },
    []
  );
};

export default (
  cards
) => {

  return cardsTextCollapsedGet(
    cards
  );
};
