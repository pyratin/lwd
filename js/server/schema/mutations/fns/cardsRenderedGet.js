'use strict';

import {
  exec
} from 'child_process';

const cardsRenderedGetFn = async (
  card
) => {

  const base64 = card.base64
    .replace(
      /^data:image\/jpeg;base64,/,
      ''
    );

  const buffer = new Buffer.from(
    base64,
    'base64'
  );

  const res = 320;

  const command = `
    convert 
    \\(
      :-
      -resize ${
        res
      }x${
        res
      }^
      -gravity center
      -crop ${
        res
      }x${
        res
      }+0+0
    \\)
    \\(
      -size ${
        res - 20
      }
      -background "#000" 
      -fill "#fff" 
      -pointsize 14 
      -font "/media/fonts/Muli-Italic-VariableFont_wght.ttf"
      pango:"${
        card.text
      }" 
      -bordercolor "#000"
      -border 10
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
    );

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        command,
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

const cardsRenderedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      return memo.then(
        (
          res
        ) => {

          return cardsRenderedGetFn(
            card
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
  _cards
) => {

  let cards = await cardsRenderedGet(
    _cards
  );
  console.log(
    JSON.stringify(
      cards.slice(-1),
      null,
      2
    )
  );
};
