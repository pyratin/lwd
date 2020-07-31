'use strict';

import cardsCharacterAssignedGet from './cardsCharacterAssignedGet';
import cardsTextCollapsedGet from 
  './cardsTextCollapsedGet';

export default (
  segments
) => {

  let cards = cardsCharacterAssignedGet(
    segments
  );

  cards = cardsTextCollapsedGet(
    cards
  );

  return (
    cards
  );
};
