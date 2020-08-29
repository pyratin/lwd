'use strict';

import deckSplashGet from './deckSplashGet';
import deckCardsGet from './deckCardsGet';
import deckCulledGet from './deckCulledGet';

export default async (
  title,
  poster,
  _cards,
  cullFlag
) => {

  const splash = deckSplashGet(
    title,
    poster,
    _cards
  );

  const cards = deckCardsGet(
    _cards,
    splash.characters
  );

  let deck = {
    splash,
    cards
  };

  deck = deckCulledGet(
    deck,
    cullFlag
  );

  return (
    deck
  );
};
