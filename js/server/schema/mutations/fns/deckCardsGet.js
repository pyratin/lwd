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

const cardsRenderTextAssignedGet = (
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

const cardsDualRoleIndexAssignedGet = (
  _cards,
  characters
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      const character = characters.find(
        (
          character
        ) => {

          return (
            character.text ===
            _card?.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ..._card,
            dualRoleIndex: character.dualRoleIndex
          }
        ];
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

export default (
  _cards,
  characters
) => {

  let cards = cardsRenderTextAssignedGet(
    _cards
  );

  cards = cardsDualRoleIndexAssignedGet(
    cards,
    characters
  );

  return (
    cards
  );
};
