'use strict';

import {
  exec
} from 'child_process';

import wordsTokenizedGet from './wordsTokenizedGet';
import {
  outputResGet
} from '~/js/server/fns/variable';
import base64TextCompositedGet from './base64TextCompositedGet';
import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

const charactersBase64AssignedGet = (
  characters,
  cards
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const card = cards.find(
        (
          card
        ) => {

          return (
            card?.character?.text ===
            character.text
          );
        }
      );

      if (
        card
      ) {

        return [
          ...memo,
          {
            ...character,
            base64: card.base64
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const characterTextShortenedGet = (
  _text,
  lengthMax
) => {

  const tokens = wordsTokenizedGet(
    _text
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

  let text = tokens.reduce(
    (
      memo,
      token
    ) => {

      if (
        memo.length < 
        lengthMax
      ) {

        return `
          ${
            memo
          } ${
            token
          }
        `
          .trim();
      }

      return (
        memo
      );
    },
    ''
  );

  text = text.slice(
    0, lengthMax
  );

  if (
    text.length <
    _text.length
  ) {

    text = `
      ${
        text
      }..
    `
      .trim();
  }

  return (
    text
  );
};

const charactersConcatedGet = (
  _characters
) => {

  const lengthMax = 10;

  let characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

      const text = characterTextShortenedGet(
        _character.text,
        lengthMax
      );

      return [
        ...memo,
        {
          ..._character,
          text
        }
      ];
    },
    []
  );

  characters = characters.reduce(
    (
      memo,
      character
    ) => {

      const dualRoleIndex = character.dualRoleIndex;

      if (
        dualRoleIndex >=
        0
      ) {

        const text = `
          ${
            memo[
              dualRoleIndex
            ]
              .text
          } / ${
            character.text
          }
        `
          .trim();

        return [
          ...memo.slice(
            0, dualRoleIndex
          ),
          {
            ...memo[
              dualRoleIndex
            ],
            text
          },
          ...memo.slice(
            dualRoleIndex + 1
          ),
          {
            ...character,
            remove: true
          }
        ];
      }

      return [
        ...memo,
        character
      ];
    },
    []
  );

  characters = characters.filter(
    (
      {
        remove
      }
    ) => {

      return (
        !remove
      );
    }
  );

  return (
    characters
  );
};

const characterBase64sGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return memo.then(
        (
          res
        ) => {

          return base64TextCompositedGet(
            character.base64,
            `
              ${
                character.text
              }
            `
              .trim(),
            outputResGet() / 3.5,
            46,
            5
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  result
                ];
              }
            );
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

const charactersCompositedBase64Get = (
  characterStreamsConcated,
  direction = 'row'
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        `
          convert 
          \\(
            miff:-
            -bordercolor transparent
            -border ${
              (direction === 'row') ?
                '2x0' : '0x2'
            }
            -gravity south
            -background none
            ${
              (direction === 'row') ?
                '+' : '-'
            }append
          \\)
          png:-
        `
          .split(
            /\s/
          )
          .reduce(
            (
              memo,
              _command
            ) => {

              return `
                ${
                  memo
                } ${
                  _command
                }
              `
                .trim();
            },
            ''
          ),
        {
          encoding: 'base64'
        },
        (
          error,
          stdout
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          return resolve(
            `
              data:image/png;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      characterStreamsConcated.pipe(
        proc.stdin
      );
    }
  );
};

const charactersMontageGet = async (
  characters
) => {

  if (
    !characters.length
  ) {

    return Promise.resolve(
      null
    );
  }

  const characterBase64s = await characterBase64sGet(
    characters
  );

  const characterRows = characterBase64s.reduce(
    (
      memo,
      characterBase64,
      index
    ) => {

      if (
        index % 2
      ) {

        return [
          ...memo.slice(
            0, -1
          ),
          [
            ...memo[
              memo.length - 1
            ], 
            characterBase64
          ]
        ];
      }

      return [
        ...memo,
        [
          characterBase64
        ]
      ];
    },
    []
  );

  const characterRowStreams = await characterRows.reduce(
    (
      memo,
      characterBase64Row
    ) => {

      return memo.then(
        (
          res
        ) => {

          return base64MiffStreamsConcatedGet(
            characterBase64Row
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  result
                ];
              }
            );
        }
      );
    },
    Promise.resolve(
      []
    )
  );

  const characterRowCompositedBase64s = 
    await characterRowStreams.reduce(
      (
        memo,
        characterRowStream
      ) => {

        return memo.then(
          (
            res
          ) => {

            return charactersCompositedBase64Get(
              characterRowStream,
              'row'
            )
              .then(
                (
                  result
                ) => {

                  return [
                    ...res,
                    result
                  ];
                }
              );
          }
        );
      },
      Promise.resolve(
        []
      )
    );

  const characterRowCompositedStreams = 
    await base64MiffStreamsConcatedGet(
      characterRowCompositedBase64s
    );

  const charactersCompositedBase64 = 
    await charactersCompositedBase64Get(
      characterRowCompositedStreams,
      'column'
    );

  return (
    charactersCompositedBase64
  );
};

export default async (
  _characters,
  cards
) => {

  let characters = charactersBase64AssignedGet(
    _characters,
    cards
  );

  characters = charactersConcatedGet(
    characters
  );

  const charactersMontageBase64 = 
    await charactersMontageGet(
      characters
    );

  return (
    charactersMontageBase64
  );
};
