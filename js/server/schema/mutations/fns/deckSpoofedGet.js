'use strict';

import deckCharactersSpoofedGet 
  from './deckCharactersSpoofedGet';
import deckCardsSpoofedGet from './deckCardsSpoofedGet';

export default (
  deck,
  genre,
  spoofFlag
) => {

  if (
    !spoofFlag
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
