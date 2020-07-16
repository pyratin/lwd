'use strict';

import nodeFetch from 'node-fetch';
import {
  exec
} from 'child_process';

import {
  outputResGet
} from '~/js/server/fns/variable';

const charactersGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      if (
        card.character
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
  movieTitle,
  buffer
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {


      let text = movieTitle.replace(
        /"/g,
        '\\"'
      );

      const res = outputResGet() / 2;

      const factor = res / 480;

      const proc = exec(
        `
          convert
          \\(
            jpeg:-
            -resize ${
              res
            }x${
              res
            }^
            -crop ${
              res
            }x${
              res
            }+0+0
          \\)
          \\(
            -size ${
              res - (
                20 * factor
              )
            }
            -background "#000"
            -fill "#fff"
            -pointsize ${
              20 * factor
            }
            -font "/media/fonts/Muli-Italic-VariableFont_wght.ttf"
            -gravity Center
            pango:"${
              text
            }"
            -bordercolor "#000"
            -border ${
              10 * factor
            }
          \\)
          -gravity south
          -compose blend
          -define compose:args=90
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
  movieTitle,
  moviePoster
) => {

  if (
    !movieTitle ||
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
          movieTitle,
          buffer
        );
      }
    );
};

const characterBase64sGetFn = (
  character
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      let text = character.text
        .replace(
          /"/g,
          '\\"'
        );

      text = `
        as <b>${
          character.text
        }</b>
      `
        .trim();

      const res = outputResGet() / 2;

      const factor = res / 480;

      const buffer = new Buffer.from(
        character.base64.replace(
          /^data:image\/jpeg;base64,/,
          ''
        ),
        'base64'
      );

      const proc = exec(
        `
          convert
          \\(
            jpeg:-
            -resize ${
              res
            }x${
              res
            }^
            -crop ${
              res
            }x${
              res
            }+0+0
          \\)
          \\(
            -size ${
              res - (
                40 * factor
              )
            }
            -background "#000"
            -fill "#fff"
            -pointsize ${
              40 * factor
            }
            -font "/media/fonts/Muli-Italic-VariableFont_wght.ttf"
            -gravity Center
            pango:"${
              text
            }"
            -bordercolor "#000"
            -border ${
              20 * factor
            }
          \\)
          -gravity south
          -compose blend
          -define compose:args=90
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

          return characterBase64sGetFn(
            character
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

export default async (
  movieTitle,
  moviePoster,
  cards
) => {

  const characters = charactersGet(
    cards
  );

  const moviePosterBase64 = await moviePosterBase64Get(
    movieTitle,
    moviePoster
  );

  const characterBase64s = await characterBase64sGet(
    characters
  );

  console.log(characterBase64s);
};
