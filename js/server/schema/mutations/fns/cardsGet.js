'use strict';

import cardsCharactersAssignedGet from 
  './cardsCharactersAssignedGet';
import cardsCharacterAssignedGet from 
  './cardsCharacterAssignedGet';

export default async (
  plot,
  characters,
) => {

  let cards = cardsCharactersAssignedGet(
    plot,
    characters
  );

  cards = cardsCharacterAssignedGet(
    cards,
    characters
  );


  return (
    cards
  );
};
