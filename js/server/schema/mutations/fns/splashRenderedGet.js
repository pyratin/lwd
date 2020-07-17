'use strict';

import nodeFetch from 'node-fetch';
import {
  exec
} from 'child_process';

import {
  outputResGet
} from '~/js/server/fns/variable';
import base64TextCompositedGet from './base64TextCompositedGet';
import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

const charactersGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      if (
        card.character &&
        !memo.find(
          (
            _memo
          ) => {

            return (
              _memo.text ===
              card.character
            );
          }
        )
      ) {

        return [
          ...memo,
          {
            text: card.character,
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

const moviePosterBase64GetFn = (
  buffer
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const res = outputResGet();

      const proc = exec(
        `
          convert 
          \\(
            -size ${
              res
            }x${
              res
            }
            xc:"#000" 
          \\)
          \\(
            jpeg:-
            -resize ${
              res
            }x${
              res
            }
          \\)
          -gravity center
          -compose blend
          -define compose:args=50
          -composite
          jpeg:-
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
              data:image/jpeg;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      proc.stdin.write(
        buffer
      );

      proc.stdin.end();
    }
  );
};

const moviePosterBase64Get = (
  moviePoster
) => {

  if (
    !moviePoster
  ) {

    return Promise.resolve(
      null
    );
  }

  return nodeFetch(
    moviePoster
  )
    .then(
      (
        res
      ) => {

        return res.buffer();
      }
    )
    .then(
      (
        buffer
      ) => {

        return moviePosterBase64GetFn(
          buffer
        );
      }
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
              As ${
                character.text
              }
            `
              .trim(),
            outputResGet() / 4,
            50,
            30
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
  characterStreamsConcated
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert miff:- -append jpeg:-',
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
              data:image/jpeg;base64,${
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

const finalCompositedGet = (
  finalCompositeMiffStreamsConcated
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert miff:- -gravity north -composite jpeg:-',
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
              data:image/jpeg;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      finalCompositeMiffStreamsConcated.pipe(
        proc.stdin
      );
    }
  );
};

export default async (
  movieTitle,
  moviePoster,
  cards
) => {

  const characters = charactersGet(
    cards
  );

  const moviePosterBase64 = await moviePosterBase64Get(
    moviePoster
  );

  const characterBase64s = await characterBase64sGet(
    characters
  );

  const characterStreamsConcated = 
    await base64MiffStreamsConcatedGet(
      characterBase64s
    );

  const charactersCompositedBase64 = 
    await charactersCompositedBase64Get(
      characterStreamsConcated 
    );

  const finalCompositeMiffStreamsConcated = 
    await base64MiffStreamsConcatedGet(
      [
        moviePosterBase64,
        charactersCompositedBase64
      ]
    );

  let splash = await finalCompositedGet(
    finalCompositeMiffStreamsConcated
  );

  splash = await base64TextCompositedGet(
    splash,
    movieTitle,
    outputResGet(),
    20,
    10
  );

  return (
    splash
  );
};
