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

  const characters = charactersCulledGet(
    deck.splash.characters,
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
