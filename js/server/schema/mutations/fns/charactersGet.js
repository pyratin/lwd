'use strict';

import leven from 'leven';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';

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

const characterEqualExistsGet = (
  _character,
  characters
) => {

  const character = (
    characters.find(
      (
        {
          text: __character
        } 
      ) => {

        return (
          __character ===
          _character
        );
      }
    )
  );

  return (
    character
  );
};

const characterLevenExistsGet = (
  _character,
  characters
) => {

  const character = characters.reduce(
    (
      memo,
      __character
    ) => {

      if (
        !memo &&
        leven(
          __character.text,
          _character
        ) === 1
      ) {

        return {
          ...__character,
          text: _character
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

const characterTokenizedExistsGet = (
  _character,
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      __character
    ) => {

      return [
        ...memo,
        ...characterTokenizedGet(
          __character.text
        )
          .map(
            (
              text
            ) => {

              return {
                ...__character,
                text
              };
            }
          )
      ];
    },
    []
  );

  const character = characters.find(
    (
      {
        text: __character
      } 
    ) => {

      return (
        __character ===
        _character
      );
    }
  );

  return (
    character
  );
};

const characterRegExpExists01Run = (
  _character,
  __character
) => {

  const characterTokenized = characterTokenizedGet(
    _character
  );

  const regExpString = `
    ${
      characterTokenized.reduce(
        (
          memo,
          _characterTokenized
        ) => {

          const prefix = (
            memo
          ) ?
            '\\s"*[A-Z][a-z]+"*\\s' :
            '';

          return `
            ${
              memo
            }${
              prefix
            }${
              _characterTokenized
            }
          `
            .trim();
        },
        ''
      )
    }
  `
    .trim();

  const regExp = new RegExp(
    regExpString
  );

  const match = __character.match(
    regExp
  );

  return (
    !!match
  );
};

const characterRegExpExistsGet = (
  _character,
  characters
) => {

  const character = characters.reduce(
    (
      memo,
      __character
    ) => {

      switch (
        true
      ) {

        case (
          !!memo
        ) :

          return (
            memo
          );

        case (
          characterRegExpExists01Run(
            _character,
            __character.text
          )
        ) :

          return {
            ...__character,
            text: _character
          };

        default :

          return (
            memo
          );
      }
    },
    null
  );

  return (
    character
  );
};

const characterRegExpReversed01Run = (
  _character,
  __character
) => {

  const match = _character.match(
    __character
  );

  return (
    !!match
  );
};

const characterRegExpReversedGet = (
  _character,
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      __character
    ) => {

      switch (
        true
      ) {

        case (
          characterRegExpReversed01Run(
            _character,
            __character.text
          )
        ) :

          return [
            ...memo,
            __character
          ];

        default:

          return (
            memo
          );
      }
    },
    []
  );

  return (
    characters
  );
};

const _castCharactersGetFn = (
  _cast,
  _castCharacters,
  plotCharacters
) => {

  return plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let characters;

      let character;

      switch (
        true
      ) {

        case (
          (
            character = characterEqualExistsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :
        case (
          (
            character = characterLevenExistsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :
        case (
          (
            character = characterTokenizedExistsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :
        case (
          (
            character = characterRegExpExistsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :

          return [
            ...memo,
            character
          ];

        case (
          (
            characters = characterRegExpReversedGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!characters
        ) :

          return [
            ...memo,
            ...characters
          ];

        default:

          return (
            memo
          );
      }
    },
    []
  );
};

const castCharactersGetFn = (
  _cast,
  plotCharacters
) => {

  let _castCharacters = NNPsGet(
    _cast.role
  )
    .reduce(
      (
        memo,
        character
      ) => {

        if (
          _cast.role.match(
            new RegExp(
              `
                ${
                  character
                }'s
              `
                .trim(),
              'g'
            )
          )
        ) {

          return (
            memo
          );
        }

        return [
          ...new Set(
            [
              ...memo,
              character
            ]
          )
        ];
      },
      []
    )
    .map(
      (
        text,
        matchIndex
      ) => {

        return {
          text,
          matchIndex
        };
      }
    );

  _castCharacters = _castCharactersGetFn(
    _cast,
    _castCharacters,
    plotCharacters
  );

  return (
    _castCharacters
  );
};

const castCharactersGet = (
  cast,
  plotCharacters
) => {

  const castCharacters = cast.reduce(
    (
      memo,
      _cast
    ) => {

      return [
        ...memo,
        castCharactersGetFn(
          _cast,
          plotCharacters
        )
      ];
    },
    []
  );

  return (
    castCharacters
  );
};

const castCharactersFlatlistGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      _castCharacters,
      castIndex
    ) => {

      return [
        ...memo,
        ..._castCharacters.reduce(
          (
            memo,
            character
          ) => {

            return [
              ...memo,
              {
                ...character,
                castIndex
              }
            ];
          },
          []
        )
      ];
    },
    []
  );
};

const charactersSortedByDistanceGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.matchIndex >
          b.matchIndex
        ) :
          
          return 1;

        case (
          b.matchIndex >
          a.matchIndex
        ) :

          return -1;
      }
    }
  );
};

const characterByTextMatchGet = (
  character,
  characters
) => {

  return characters.find(
    (
      _character
    ) => {

      return (
        _character.text.match(
          character.text
        )
      );
    }
  );
};

const _charactersGetFn = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      if (
        !characterByTextMatchGet(
          character,
          memo
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

const charactersGetFn = (
  _characters
) => {

  let characters = charactersSortedByDistanceGet(
    _characters
  );

  characters = _charactersGetFn(
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
  );
};

const charactersGet = (
  castCharacters,
  cast
) => {

  let characters = castCharactersFlatlistGet(
    castCharacters
  );

  characters = charactersGetFn(
    characters
  );

  characters = charactersCastDataAssignedGet(
    characters,
    cast
  );

  return (
    characters
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

  let characters = charactersGet(
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
