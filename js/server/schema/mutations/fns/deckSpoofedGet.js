'use strict';

import deckCharactersSpoofedGet 
  from './deckCharactersSpoofedGet';
import deckCardsSpoofedGet from './deckCardsSpoofedGet';

export default (
  deck,
  spoofFlag,
  hero
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
    hero
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
