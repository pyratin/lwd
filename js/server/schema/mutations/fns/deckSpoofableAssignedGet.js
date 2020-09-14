'use strict';

import plotNNPsGet from './plotNNPsGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

const heroExistsGet = (
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

  return (
    !!matches
  );
};

const textIsLengthyGet = (
  deck
) => {

  return deck.cards
    .reduce(
      (
        memo,
        {
          text
        }
      ) => {

        if (
          !memo &&
          (
            text.length >
            (
              100 + 
              25
            )
          )
        ) {

          return (
            true
          );
        }

        return (
          memo
        );
      },
      false
    );
};

export default (
  deck
) => {

  const heroExists = heroExistsGet(
    deck
  );

  const textIsLengthy = textIsLengthyGet(
    deck
  );

  return {
    ...deck,
    splash: {
      ...deck.splash,
      spoofable: (
        !!heroExists &&
        !textIsLengthy
      )
    }
  };
};
