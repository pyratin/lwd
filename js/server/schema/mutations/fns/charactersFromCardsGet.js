'use strict';

const charactersFromCardsGet = (
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

          const characterText = card?.character?.text;

          return (
            characterText &&
            (
              (
                characterText
                  .match(
                    _memo.text
                  )
              ) ||
              (
                _memo.text
                  .match(
                    characterText
                  )
              )
            )
          );
        }
      );

      if (
        card?.character?.text &&
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

  let characters = charactersFromCardsGet(
    _cards
  );

  characters = charactersSortedByCastIndexGet(
    characters
  ); 

  return (
    characters
  );
};