'use strict';

import natural from 'natural';
import leven from 'leven';

import NNPsFromSentenceGet from './NNPsFromSentenceGet';

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
  character,
  characters
) => {

  const exists = !!(
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

  return (
    exists
  );
};

const characterWithinLevenDistanceExixtsGet = (
  character,
  characters
) => {

  return characters.reduce(
    (
      memo,
      _character
    ) => {

      if (
        !memo &&
        leven(
          _character,
          character
        ) === 1
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

const castCharactersFilter = (
  characters,
  _cast,
  castCharacters,
  plotCharacters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      if (
        (
          !_cast.role.match(
            `
              ${
                character
              }'s
            `
              .trim()
          )
        ) &&
        (
          !characterExistsGet(
            character,
            castCharacters
          )
        ) &&
        (
          (
            characterExistsGet(
              character,
              plotCharacters
            )
          ) ||
          (
            characterWithinLevenDistanceExixtsGet(
              character,
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

        return [
          ...new Set(
            [
              ...memo,
              character,
              ...(
                () => {

                  return new natural.TreebankWordTokenizer()
                    .tokenize(
                      character
                    );
                }
              )()
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

  const castCharacters = castCharactersGet(
    cast,
    plotCharacters
  );

  const characters = charactersGet(
    castCharacters,
    cast
  );

  return (
    characters
  );
};