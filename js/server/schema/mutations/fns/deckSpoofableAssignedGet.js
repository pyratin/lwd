'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

export default (
  deck
) => {

  const heroCharacter = deck.splash.characters
    .find(
      (
        character
      ) => {

        return (
          (
            character.castIndex ===
            0
          ) &&
          (
            character.actor.gender ===
            'man'
          )
        );
      }
    );

  const NNP = {
    text: heroCharacter?.text,
    index: 0
  };

  const _NNPs = plotNNPsGet(
    deck.cards
  );

  const matches = NNPCrossMatchesGet(
    NNP,
    _NNPs
  );

  return {
    ...deck,
    splash: {
      ...deck.splash,
      spoofable: !!matches
    }
  };
};
