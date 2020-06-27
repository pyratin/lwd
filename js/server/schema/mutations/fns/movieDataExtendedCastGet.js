'use strict';

import NNPsFromSentenceGet from './NNPsFromSentenceGet';

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

const charactersExtendedGetFn = (
  character
) => {

  return character.split(
    /[^\w]/
  )
    .filter(
      (
        _character
      ) => {

        return (
          !!_character
        );
      }
    );
};

const charactersExtendedGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...new Set(
          [
            ...memo,
            character,
            ...charactersExtendedGetFn(
              character
            )
          ]
        )
      ];
    },
    []
  );
};

const characterExistsGet = (
  character,
  _characters
) => {

  const characters = charactersExtendedGet(
    _characters
  );

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

const charactersFilteredGet = (
  characters,
  _characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = characterExistsGet(
        character,
        _characters
      );

      if (
        !exists
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

const charactersGet = (
  role,
  _characters
) => {

  const NNPs = NNPsFromSentenceGet(
    role
  );

  const characters = charactersFilteredGet(
    NNPs,
    _characters
  );

  return (
    characters
  );
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
  //console.log(cast);
};
