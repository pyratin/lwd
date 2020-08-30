'use strict';

export default (
  cards,
  characters
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const character = characters.find(
        (
          {
            text
          }
        ) => {

          return (
            text ===
            card.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ...card,
            actorImageId: character.actorImageId
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );
};
