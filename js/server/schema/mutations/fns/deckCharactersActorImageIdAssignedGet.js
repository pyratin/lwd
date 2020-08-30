'use strict';

export default (
  characters,
  cards
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const card = cards.find(
        (
          card
        ) => {

          return (
            card.character?.text ===
            character.text
          );
        }
      );

      return [
        ...memo,
        {
          ...character,
          actorImageId: card.actorImageId
        }
      ];
    },
    []
  );
};
