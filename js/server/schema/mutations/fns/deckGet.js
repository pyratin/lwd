'use strict';

import deckCardsGet from './deckCardsGet';

export default (
  _cards
) => {

  const cards = deckCardsGet(
    _cards
  );

  return {
    cards
  };
};
