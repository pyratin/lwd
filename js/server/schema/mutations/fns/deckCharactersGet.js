'use strict';

import deckCharactersCategorisedGet from 
  './deckCharactersCategorisedGet';

const charactersGetFn = (
  fragments
) => {

  return fragments.reduce(
    (
      memo,
      fragment
    ) => {

      if (
        fragment.type ===
        'actor'
      ) {

        return [
          ...memo,
          fragment
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const characterExistsGet = (
  characters,
  character
) => {

  const characterExists = characters.find(
    (
      _character
    ) => {

      return (
        _character.text ===
        character.text
      );
    }
  );

  return (
    !!characterExists
  );
};

const charactersGet = (
  deckSegments
) => {

  return deckSegments.reduce(
    (
      memo,
      segment
    ) => {

      return [
        ...memo,
        ...charactersGetFn(
          segment
        )
      ];
    },
    []
  )
    .reduce(
      (
        memo,
        character
      ) => {

        if (
          !characterExistsGet(
            memo,
            character
          )
        ) {

          return [
            ...memo,
            character
          ];
        }

        return (
          memo
        );
      },
      []
    );
};

export default async (
  deckSegments,
  plotText
) => {

  const characters = charactersGet(
    deckSegments
  );

  const charactersCategorised = await deckCharactersCategorisedGet(
    characters,
    plotText
  );
};
