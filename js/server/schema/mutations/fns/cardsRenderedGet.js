'use strict';

import {
  exec
} from 'child_process';

const cardsRenderedGetFn = async (
  card
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      let text = card.text
        .replace(
          /"/g,
          '\\"'
        );

      const character = card.character;

      if (
        character
      ) {

        text = text.replace(
          new RegExp(
            character
          ),
          `
            <b>${
              character
            }</b>
          `
            .trim()
        );
      }

      const res = 480;

      const command = `
        convert 
        \\(
          jpeg:-
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
          -pointsize 20
          -font "/media/fonts/Muli-Italic-VariableFont_wght.ttf"
          pango:"${
            text
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

      const _base64 = card.base64
        .replace(
          /^data:image\/jpeg;base64,/,
          ''
        );

      const buffer = new Buffer.from(
        _base64,
        'base64'
      );

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

          const base64 = `
            data:image/jpeg;base64,${
              stdout
            }
          `
            .trim();

          return resolve(
            base64
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
      cards,
      null,
      2
    )
  );
};
