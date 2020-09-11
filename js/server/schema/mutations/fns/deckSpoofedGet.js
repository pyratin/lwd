'use strict';

import deckCharactersSpoofedGet 
  from './deckCharactersSpoofedGet';
import deckCardsSpoofedGet from './deckCardsSpoofedGet';

export default (
  deck,
  genre
) => {

  if (
    !genre.match(
      /^spoof-/
    )
  ) {

    return (
      deck
    );
  }

  const characters = deckCharactersSpoofedGet(
    deck.splash.characters,
    genre
  );

  const cards = deckCardsSpoofedGet(
    deck.cards,
    characters
  );

  return {
    ...deck,
    splash: {
      ...deck.splash,
      characters
    },
    cards
  };
};
