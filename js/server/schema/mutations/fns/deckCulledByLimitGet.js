'use strict';

const textTerminatedGet = (
  memo
) => {

  return (
    !memo[
      memo.length - 1
    ]?.text.match(
        /\s...,$/
      )
  );
};

const cardsCulledByLimitGet = (
  _cards,
  roles,
  deckHardLimit
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      switch (
        true
      ) {

        case (
          !!deckHardLimit &&
          (
            memo.length >=
            deckHardLimit
          ) &&
          textTerminatedGet(
            memo
          )
        ) :

          return (
            memo
          );

        default :

          return [
            ...memo,
            _card
          ];
      }
    },
    []
  );

  return (
    cards
  );
};

const cardCharactersGetFn = (
  characters,
  _characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = _characters.find(
        (
          _character
        ) => {

          return (
            _character.text ===
            character.text
          );
        }
      );

      if (
        !exists
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

const cardCharactersGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const characters = cardCharactersGetFn(
        card.characters,
        memo
      );

      return [
        ...memo,
        ...characters
      ];
    },
    []
  );
};

const charactersCulledGet = (
  characters,
  cards
) => {

  const cardCharacters = cardCharactersGet(
    cards
  );

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = cardCharacters.find(
        (
          _character
        ) => {

          return (
            _character.text ===
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

const charactersStarringCardIndexesAssignedGet = (
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

export default (
  deck,
  deckHardLimit,
  deckLimitByRolesFlag
) => {

  const cards = cardsCulledByLimitGet(
    deck.cards,
    deck.roles,
    deckHardLimit,
    deckLimitByRolesFlag
  );

  let characters = charactersCulledGet(
    deck.splash.characters,
    cards
  );

  characters = charactersStarringCardIndexesAssignedGet(
    characters,
    cards
  );

  return {
    ...deck,
    cards, 
    splash: {
      ...deck.splash,
      characters
    }
  };
};
