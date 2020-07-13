'use strict';

import leven from 'leven';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';

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
        __character
      ) => {

        return (
          __character ===
          _character
        );
      }
    )
  );

  return (
    !!character
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
          __character,
          _character
        ) === 1
      ) {

        return (
          _character
        );
      }

      return (
        memo
      );
    },
    null
  );

  return (
    !!character
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
          __character
        )
      ];
    },
    []
  );

  const character = characters.find(
    (
      __character
    ) => {

      return (
        __character ===
        _character
      );
    }
  );

  return (
    !!character
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
            '\\s[A-Z][a-z]+\\s' :
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
            __character
          )
        ) :

          return (
            _character
          );

        default :

          return (
            memo
          );
      }
    },
    null
  );

  return (
    !!character
  );
};

const characterRegExpResults01Run = (
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

const characterRegExpResultsGet = (
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
          characterRegExpResults01Run(
            _character,
            __character
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

      switch (
        true
      ) {

        case (
          characterEqualExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterLevenExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterTokenizedExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterRegExpExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :

          return [
            ...memo,
            plotCharacter
          ];

        case (
          (
            characters = characterRegExpResultsGet(
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

  return cast.reduce(
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
};

const charactersGet = (
  castCharacters,
  cast
) => {

  const characters = castCharacters.reduce(
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
            characterText
          ) => {

            return [
              ...memo,
              {
                text: characterText,
                castIndex
              }
            ];
          },
          []
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
          memo.find(
            (
              _memo
            ) => {

              return (
                _memo.text ===
                character.text
              );
            }
          )
        ) {

          return (
            memo
          );
        }

        return [
          ...memo,
          character
        ];
      },
      []
    )
    .reduce(
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

  return (
    characters
  );
};
