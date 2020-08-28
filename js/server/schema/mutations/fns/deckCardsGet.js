'use strict';

const cardTextGet = (
  {
    text: _text,
    character
  }
) => {

  let text = _text;

  if (
    !character
  ) {

    return (
      text
    );
  }

  text = `
    ${
      text.slice(
        0, character.distance
      )
    }<b>${
      character.text
    }</b>${
      text.slice(
        character.distance +
        character.text.length
      )
    }
  `
    .trim();

  return (
    text
  );
};

const cardGet = (
  card
) => {

  const text = cardTextGet(
    card
  );

  return {
    ...card,
    text
  };
};

export default (
  cards
) => {

  return cards.reduce(
    (
      memo,
      _card
    ) => {

      const card = cardGet(
        _card
      );

      return [
        ...memo,
        card
      ];
    },
    []
  );
};
