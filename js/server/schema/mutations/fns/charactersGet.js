'use strict';

import leven from 'leven';

import NNPsFromSentenceGet from './NNPsFromSentenceGet';
import wordsTokenizedGet from './wordsTokenizedGet';

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
            ...NNPsFromSentenceGet(
              sentence.text
            )
          ]
        )
      ];
    },
    []
  );
};

const characterExistsGet = (
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
    character
  );
};

const characterWithinLevenDistanceExixtsGet = (
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
          __character
        );
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

const characterRegExpFilteredGetFn = (
  character
) => {

  const characterTokenized = characterTokenizedGet(
    character
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

  return (
    regExpString
  );
};

const characterRegExpFilteredGet = (
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
        (
          _character.match(
            characterRegExpFilteredGetFn(
              __character
            )
          )
        )
      ) {

        return (
          __character
        );
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

const castCharactersFilter = (
  characters,
  _cast,
  castCharacters,
  plotCharacters
) => {

  return characters.reduce(
    (
      memo,
      _character
    ) => {

      let character;

      if (
        (
          character = !_cast.role.match(
            `
              ${
                _character
              }'s
            `
              .trim()
          )
        ) &&
        (
          character = !characterExistsGet(
            _character,
            castCharacters
          )
        ) &&
        (
          (
            character = characterExistsGet(
              _character,
              plotCharacters
            )
          ) ||
          (
            character = characterWithinLevenDistanceExixtsGet(
              _character,
              plotCharacters
            )
          ) ||
          (
            character = characterRegExpFilteredGet(
              _character,
              plotCharacters
            )
          )
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

const castCharactersGetFn = (
  _cast,
  castCharacters,
  plotCharacters
) => {

  let characters = NNPsFromSentenceGet(
    _cast.role
  )
    .reduce(
      (
        memo,
        character
      ) => {

        const characterTokenized = characterTokenizedGet(
          character
        );

        return [
          ...new Set(
            [
              ...memo,
              character,
              ...characterTokenized
            ]
          )
        ];
      },
      []
    );

  characters = castCharactersFilter(
    characters,
    _cast,
    castCharacters,
    plotCharacters
  );

  return (
    characters
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
          memo.reduce(
            (
              memo,
              _memo
            ) => {

              return [
                ...memo,
                ..._memo
              ];
            },
            []
          ),
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

export default (
  cast,
  plot
) => {

  const plotCharacters = plotCharactersGet(
    plot
  );

  //console.log(plotCharacters);

  const castCharacters = castCharactersGet(
    cast,
    plotCharacters
  );

  //console.log(castCharacters);

  const characters = charactersGet(
    castCharacters,
    cast
  );

  return (
    characters
  );
};
