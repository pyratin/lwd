'use strict';

const starringCharactersGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card,
      cardIndex
    ) => {

      const starringCardIndex = memo.findIndex(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            card.character?.text
          );
        }
      );

      switch (
        true
      ) {

        case (
          !card.character
        ) :

          return (
            memo
          );

        case (
          starringCardIndex >=
          0
        ) :

          return [
            ...memo.slice(
              0, starringCardIndex
            ),
            {
              ...memo[
                starringCardIndex
              ],
              starringCardIndexes: [
                ...memo[
                  starringCardIndex
                ]
                  .starringCardIndexes,
                cardIndex
              ]
            },
            ...memo.slice(
              starringCardIndex + 
              1
            )
          ];

        default :

          return [
            ...memo,
            {
              ...card.character,
              starringCardIndexes: [
                cardIndex
              ]
            }
          ];
      }
    },
    []
  );
};

export default (
  characters,
  cards
) => {

  const starringCharacters = starringCharactersGet(
    cards
  );

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const match = starringCharacters.find(
        (
          starringCharacter
        ) => {

          return (
            starringCharacter.text ===
            character.text
          );
        }
      );

      return [
        ...memo,
        {
          ...character,
          starringCardIndexes: (
            match
          ) ?
            match.starringCardIndexes :
            null
        }
      ];
    },
    []
  );
};

