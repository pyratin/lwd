'use strict';

import {
  capitalizedWordsRegExpForRole
} from './variable';

const characterFlatListGet = (
  cast
) => {

  return cast.reduce(
    (
      memo,
      _cast
    ) => {

      return [
        ...new Set(
          [
            ...memo,
            ..._cast.characters
          ]
        )
      ];
    },
    []
  );
};

const characterExistsGet = (
  character,
  characters
) => {

  return !!(
    characters.find(
      (
        _character
      ) => {

        return (
          _character ===
          character
        );
      }
    )
  );
};

const capitalizedsWordsGet = (
  role,
  characters
) => {

  let capitalizedsWords = [];

  let match;

  while (
    (
      match = capitalizedWordsRegExpForRole.exec(
        role
      )
    )
  ) {

    const character = match[
      1
    ];

    const exists = characterExistsGet(
      character,
      characters
    );

    if (
      !match[
        2
      ] &&
      !exists &&
      !character.match(
        /'s/
      ) &&
      !character.match(
        /\.$/
      )
    ) {

      capitalizedsWords = [
        ...capitalizedsWords,
        character
      ];
    }
  }

  return (
    capitalizedsWords
  );
};

const charactersGet = (
  role,
  characters
) => {

  const capitalizedsWords = capitalizedsWordsGet(
    role,
    characters
  );

  return [
    ...capitalizedsWords
  ];
};

const charactersAssignedGetFn = (
  __cast,
  characters
) => {

  return {
    ...__cast,
    characters: charactersGet(
      __cast.role,
      characters
    )
  };
};

const charactersAssignedGet = (
  _cast
) => {

  return _cast.reduce(
    (
      memo,
      __cast
    ) => {

      const characters = characterFlatListGet(
        memo
      );

      return [
        ...memo,
        charactersAssignedGetFn(
          __cast,
          characters
        )
      ];
    },
    []
  );
};

export default (
  _cast
) => {

  let cast = charactersAssignedGet(
    _cast
  );
  console.log(cast);
};
