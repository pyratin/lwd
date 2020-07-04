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

const characterLevenExixtsGet = (
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
    character
  );
};

const characterRegExpExistsGetFn = (
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

const characterRegExpExistsGet = (
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
            characterRegExpExistsGetFn(
              __character
            )
          )
        )
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
    character
  );
};

const _castCharactersGetFn = (
  _cast,
  _castCharacters,
  plotCharacters
) => {
  console.log(plotCharacters, '--------');

  return plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let character;

      switch (
        true
      ) {

        case (
          (
            character = characterExistsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :
        case (
          (
            character = characterLevenExixtsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!character
        ) :
        case (
          (
            (
              character = characterRegExpExistsGet(
                plotCharacter,
                _castCharacters
              )
            )
          ) &&
          !!character
        ):

          return [
            ...memo,
            character
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

  let _castCharacters = NNPsFromSentenceGet(
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

  //console.log(characters);

  return (
    characters
  );
};
