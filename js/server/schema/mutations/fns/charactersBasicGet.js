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
    plotCharacter :
    null;
};

const characterLevenMatchedGet = (
  plotCharacter,
  castCharacter
) => {

  const character = (
    leven(
      plotCharacter,
      castCharacter
    ) === 1
  ) ?
    plotCharacter :
    null;

  return (
    character
  );
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
    'castCharacter'
  ) ?
    character :
    _character;
};

const __charactersGetFn = (
  plotCharacter,
  castCharacter
) => {

  let characterText;

  switch (
    true
  ) {

    case (
      (
        characterText = characterStringMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!characterText
    ) :
    case (
      (
        characterText = characterLevenMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!characterText
    ) :
    case (
      (
        characterText = characterFragmentMatchedGet(
          plotCharacter,
          castCharacter,
          'castCharacter'
        )
      ) &&
      !!characterText
    ) :
    case (
      (
        characterText = characterFragmentMatchedGet(
          castCharacter,
          plotCharacter,
          'plotCharacter'
        )
      ) &&
      !!characterText
    ) :

      return (
        plotCharacter
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

      const characterText = __charactersGetFn(
        plotCharacter,
        castCharacter.text
      );

      if (
        !memo &&
        characterText
      ) {

        return {
          ...castCharacter,
          text: characterText
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
