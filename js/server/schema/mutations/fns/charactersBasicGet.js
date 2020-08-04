'use strict';

import leven from 'leven';
import combinations from 'combinations';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';

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
  plotCharacter,
  castCharacter
) => {

  return (
    plotCharacter ===
    castCharacter
  ) ?
    '0' :
    null;
};

const characterLevenMatchedGet = (
  plotCharacter,
  castCharacter
) => {

  return (
    leven(
      plotCharacter,
      castCharacter
    ) === 1
  ) ?
    '1' :
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
  _character
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

  return (
    characterToken
  ) ?
    '2' :
    null;
};

const __charactersGetFn = (
  plotCharacter,
  castCharacter
) => {

  let matchIndexString;

  switch (
    true
  ) {

    case (
      (
        matchIndexString = characterStringMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterLevenMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterFragmentMatchedGet(
          plotCharacter,
          castCharacter,
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterFragmentMatchedGet(
          castCharacter,
          plotCharacter,
        )
      ) &&
      !!matchIndexString
    ) :

      return (
        {
          text: plotCharacter,
          matchIndex: parseInt(
            matchIndexString
          ),
          levenMatchText: (
            parseInt(
              matchIndexString
            ) === 
            1
          ) ?
            castCharacter :
            null
        }
      );
  }
};

const _charactersGetFn = (
  plotCharacter,
  castCharacters
) => {

  const character = castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      const match = __charactersGetFn(
        plotCharacter,
        castCharacter.text
      );

      if (
        !memo &&
        match
      ) {

        return {
          ...castCharacter,
          ...match
        };
      }

      return (
        memo
      );
    },
    null
  );

  return (
    character
  );
};

const charactersGetFn = (
  plotCharacters,
  castCharacters
) => {

  const characters = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let character = _charactersGetFn(
        plotCharacter,
        castCharacters
      );

      if (
        character
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

  return (
    characters
  );
};

const charactersSortedGet = (
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

      const exists = (
        character.text ===
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

const charactersUniqueMatchesGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      const exists = characterExistsGet(
        castCharacter,
        memo
      );

      if (
        !exists
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

const charactersGet = (
  cast,
  plotCharacters
) => {

  const castCharacters = castCharactersFlatlistGet(
    cast
  );

  let characters = charactersGetFn(
    plotCharacters,
    castCharacters
  );

  characters = charactersSortedGet(
    characters
  );

  characters = charactersUniqueMatchesGet(
    characters
  );

  return (
    characters
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

export default (
  cast,
  plot
) => {

  const plotCharacters = plotCharactersGet(
    plot
  );

  let characters = charactersGet(
    cast,
    plotCharacters
  );

  characters = charactersCastDataAssignedGet(
    characters,
    cast
  );

  return (
    characters
  );
};
