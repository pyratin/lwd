'use strict';

import {
  exec
} from 'child_process';

const cardsRenderedGetFn = (
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
        jpeg:-
        -resize ${
          res
        }x${
          res
        }
        -gravity center
        -crop ${
          res
        }x${
          res
        }+0+0
      \\)
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
            memo ||
            ''
          } ${
            _command
          }
        `
          .trim();
      },
      null
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
        console.log('error', error);
      }

      console.log('stdout', stdout);
    }
  );

  proc.stdin.write(
    buffer
  );

  proc.stdin.end();

  return Promise.resolve();
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

export default (
  _cards
) => {

  let cards = cardsRenderedGet(
    _cards.slice(0, 1)
  );
};
