'use strict';

import leven from 'leven';
import combinations from 'combinations';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';

const plotCharactersGet = (
  plot
) => {

  return plot.reduce(
    (
      memo,
      sentence
    ) => {

      return [
        ...new Set(
          [
            ...memo,
            ...NNPsGet(
              sentence.text
            )
          ]
        )
      ];
    },
    []
  );
};

const castCharactersFlatlistGet = (
  cast
) => {

  return cast.reduce(
    (
      _castMemo,
      _cast,
      castIndex
    ) => {

      const castCharacters = NNPsGet(
        _cast.role
      )
        .reduce(
          (
            castCharacterMemo,
            text
          ) => {

            const possessive = !!_cast.role
              .match(
                new RegExp(
                  `
                    ${
                      text
                    }'s
                  `
                    .trim()
                )
              );

            return [
              ...castCharacterMemo,
              {
                text,
                castIndex,
                roleIndex: _cast.role
                  .match(
                    text
                  )
                  .index,
                possessive
              }
            ];
          },
          []
        );

      return [
        ..._castMemo,
        ...castCharacters
      ];
    },
    []
  );
};

const characterStringMatchedGet = (
  character,
  _character
) => {

  return (
    character ===
    _character
  ) ?
    {
      text: _character,
      matchMethodIndex: 0,
      matchReturned: 'plotCharacter'
    } :
    null;
};

const characterLevenMatchedGet = (
  character,
  _character
) => {

  return (
    leven(
      character,
      _character
    ) === 1
  ) ?
    {
      text: _character,
      matchMethodIndex: 1,
      matchReturned: 'plotCharacter'
    } :
    null;
};

const characterTokenizedGet = (
  character
) => {

  return wordsTokenizedGet(
    character
  )
    .map(
      (
        {
          text
        }
      ) => {

        return (
          text
        );
      }
    );
};

const characterFragmentMatchedGet = (
  character,
  _character,
  tokensSource
) => {

  const characterTokenCombinations = combinations(
    characterTokenizedGet(
      _character
    )
  )
    .reduce(
      (
        memo,
        characterTokenCombination
      ) => {

        return [
          ...memo,
          characterTokenCombination.join(
            ' '
          )
        ];
      },
      []
    );

  const characterToken = characterTokenCombinations.find(
    (
      characterToken
    ) => {

      return (
        characterToken ===
        character
      );
    }
  );

  if (
    !characterToken
  ) {

    return (
      null
    );
  }

  return (
    tokensSource === 
    'plotCharacter'
  ) ?
    {
      text: character,
      matchMethodIndex: 2,
      matchReturned: 'castCharacter'
    } :
    {
      text: _character,
      matchMethodIndex: 2,
      matchReturned: 'plotCharacter'
    };
};

const __castCharactersGetFn = (
  castCharacter,
  plotCharacter
) => {

  let match;

  switch (
    true
  ) {

    case (
      (
        match = characterStringMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!match.text
    ) :
    case (
      (
        match = characterLevenMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!match.text
    ) :
    case (
      (
        match = characterFragmentMatchedGet(
          plotCharacter,
          castCharacter.text,
          'plotCharacter'
        )
      ) &&
      !!match.text
    ) :
    case (
      (
        match = characterFragmentMatchedGet(
          castCharacter.text,
          plotCharacter,
          'castCharacter'
        )
      ) &&
      !!match.text
    ) :

      return {
        ...castCharacter,
        ...match
      };
  }
};

const _castCharactersGetFn = (
  _castCharacter,
  plotCharacters
) => {

  const castCharacter = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      const castCharacter = __castCharactersGetFn(
        _castCharacter,
        plotCharacter
      );

      if (
        !memo &&
        castCharacter
      ) {

        return (
          castCharacter
        );
      }

      return (
        memo
      );
    },
    null
  );

  return (
    castCharacter
  );
};

const castCharactersGetFn = (
  castCharacters,
  plotCharacters
) => {

  const castCharacter = castCharacters.reduce(
    (
      memo,
      _castCharacter
    ) => {

      let castCharacter = _castCharactersGetFn(
        _castCharacter,
        plotCharacters
      );

      if (
        castCharacter
      ) {

        return [
          ...memo,
          castCharacter
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    castCharacter
  );
};

const castCharactersSortedGet = (
  castCharacters
) => {

  return castCharacters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.matchReturned === 'plotCharacter' &&
          b.matchReturned === 'castCharacter'
        ) :

          return -1;

        case (
          b.matchReturned === 'plotCharacter' &&
          a.matchReturned === 'castCharacter'
        ) :

          return 1;

        case (
          a.possessive &&
          !b.possessive
        ) :

          return 1;

        case (
          b.possessive &&
          !a.possessive
        ) :

          return -1;

        case (
          a.roleIndex >
          b.roleIndex
        ) :

          return 1;

        case (
          b.roleIndex >
          a.roleIndex
        ) :

          return -1;

        case (
          a.castIndex >
          b.castIndex
        ) :

          return 1;

        case (
          b.castIndex >
          a.castIndex
        ) :

          return -1;
      }
    }
  );
};

const characterExistsGet = (
  character,
  characters
) => {

  return characters.reduce(
    (
      memo,
      _character
    ) => {

      const exists = __castCharactersGetFn(
        character,
        _character.text
      );

      if (
        !memo &&
        exists
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

const castCharactersUniqueGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      if (
        !characterExistsGet(
          castCharacter,
          memo
        )
      ) {

        return [
          ...memo,
          castCharacter
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const castCharactersGet = (
  cast,
  plotCharacters
) => {

  let castCharacters = castCharactersFlatlistGet(
    cast
  );

  castCharacters = castCharactersGetFn(
    castCharacters,
    plotCharacters
  );

  castCharacters = castCharactersSortedGet(
    castCharacters
  );
  console.log(castCharacters)

  castCharacters = castCharactersUniqueGet(
    castCharacters
  );

  return (
    castCharacters
  );
};

const charactersCastDataAssignedGet = (
  characters,
  cast
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...memo,
        {
          ...character,
          ...cast[
            character.castIndex
          ]
        }
      ];
    },
    []
  )
    .map(
      (
        character
      ) => {

        delete character.roleIndex;

        return (
          character
        );
      }
    );
};

export default async (
  cast,
  plot,
  plotText
) => {

  const plotCharacters = plotCharactersGet(
    plot
  );

  const castCharacters = castCharactersGet(
    cast,
    plotCharacters
  );

  let characters = charactersCastDataAssignedGet(
    castCharacters,
    cast
  );

  characters = await charactersCategoryAssignedGet(
    characters,
    plotText
  );

  characters = await charactersActorGenderAssignedGet(
    characters
  );

  return (
    characters
  );
};
