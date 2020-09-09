'use strict';

import deckCharactersSpoofedGet 
  from './deckCharactersSpoofedGet';
import deckCardsSpoofedGet from './deckCardsSpoofedGet';

export default (
  deck,
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
    deck.splash.characters
  );

  const cards = deckCardsSpoofedGet(
    deck.cards,
    characters
  );

  return (
    deck
  );
};
