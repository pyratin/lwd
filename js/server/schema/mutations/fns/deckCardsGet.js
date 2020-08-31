'use strict';

const cardTextGet = (
  {
    text: _text,
    character
  }
) => {

  let renderText = _text;

  if (
    !character
  ) {

    return (
      renderText
    );
  }

  renderText = `
    ${
      renderText.slice(
        0, character.distance
      )
    }<b>${
      character.text
    }</b>${
      renderText.slice(
        character.distance +
        character.text.length
      )
    }
  `
    .trim();

  return (
    renderText
  );
};

const cardGet = (
  card
) => {

  const renderText = cardTextGet(
    card
  );

  return {
    ...card,
    renderText
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
