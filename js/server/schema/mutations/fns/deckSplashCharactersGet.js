'use strict';

const charactersFromCardsGetFn = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            card.character?.text
          );
        }
      );

      if (
        card.character &&
        !exists
      ) {

        return [
          ...memo,
          card.character
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const charactersSortedByCastIndexGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.castIndex >
          b.castIndex
        ) :

          return 1;

        case (
          b.castIndex >
          a.castIndex
        ) :

          return -1;
      }
    }
  );
};

export default (
  _cards
) => {

  let characters = charactersFromCardsGetFn(
    _cards
  );

  characters = charactersSortedByCastIndexGet(
    characters
  ); 

  return (
    characters
  );
};
