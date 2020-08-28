'use strict';

import deckSplashGet from './deckSplashGet';
import deckCardsGet from './deckCardsGet';

const cardsDualRoleIndexAssignedGet = (
  _cards,
  characters
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      const character = characters.find(
        (
          character
        ) => {

          return (
            character.text ===
            _card?.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ..._card,
            dualRoleIndex: character.dualRoleIndex
          }
        ];
      }

      return [
        ...memo,
        _card
      ];
    },
    []
  );

  return (
    cards
  );
};

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
    _cards
  );

  cards = cardsDualRoleIndexAssignedGet(
    cards,
    splash.characters
  );

  return {
    splash,
    cards
  };
};
