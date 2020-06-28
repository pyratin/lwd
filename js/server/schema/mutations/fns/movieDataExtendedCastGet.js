'use strict';

import natural from 'natural';

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
          characterExistsGet(
            character,
            plotCharacters
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

  console.log(castCharacters);
};
