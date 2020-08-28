'use strict';

import deckSplashGet from './deckSplashGet';
import deckCardsGet from './deckCardsGet';

export default (
  title,
  poster,
  _cards
) => {

  const splash = deckSplashGet(
    title,
    poster,
    _cards
  );

  let cards = deckCardsGet(
    _cards,
    splash.characters
  );

  return {
    splash,
    cards
  };
};
