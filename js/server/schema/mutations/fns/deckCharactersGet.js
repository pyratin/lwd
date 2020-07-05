'use strict';

import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';

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
    )
    .reduce(
      (
        memo,
        character,
        index
      ) => {

        return [
          ...memo,
          {
            ...character,
            index
          }
        ];
      },
      []
    );
};

export default async (
  deckSegments,
  plotText
) => {

  let characters = charactersGet(
    deckSegments
  );

  characters = await charactersCategoryAssignedGet(
    characters,
    plotText
  );

  console.log(characters);
};
