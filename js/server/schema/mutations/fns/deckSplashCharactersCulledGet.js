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

      const exists = cards.find(
        (
          card
        ) => {

          return (
            card.character?.text ===
            character.text
          );
        }
      );

      if (
        exists
      ) {

        return [
          ...memo,
          character
        ];
      }

      return (
        memo
      );
    },
    []
  );
};
