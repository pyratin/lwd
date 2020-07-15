'use strict';

import {
  exec
} from 'child_process';
import streamcat from 'streamcat';

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

const miffsGetFn = (
  base64
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const buffer = new Buffer.from(
        base64.replace(
          /^data:image\/jpeg;base64,/,
          ''
        ),
        'base64'
      );

      const proc = exec(
        'convert jpeg:- -resize 200x200 miff:-',
        {
          encoding: base64
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
            stdout
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

const miffsGet = (
  base64s
) => {

  return base64s.reduce(
    (
      memo,
      base64
    ) => {

      return memo.then(
        (
          res
        ) => {

          return miffsGetFn(
            base64
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

const gifGetFn = (
  miffs
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert -loop 0 -delay 500 miff:- gif:-',
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
            stdout
          );
        }
      );

      miffs.pipe(
        proc.stdin
      );
    }
  );
};

const gifOptimizedGet = (
  gif
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const buffer = new Buffer.from(
        gif,
        'base64'
      );

      const proc = exec(
        'convert gif:- -coalesce -fuzz 2% +dither -layers Optimize +map gif:-',
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

const gifGet = async (
  base64s
) => {

  let miffs = await miffsGet(
    base64s
  );

  miffs = streamcat(
    miffs
  );

  let gif = await gifGetFn(
    miffs
  );

  gif = await gifOptimizedGet(
    gif
  );

  return (
    gif
  );
};

export default async (
  _cards
) => {

  const base64s = await cardsRenderedGet(
    _cards
  );

  const gif = await gifGet(
    base64s
  );

  console.log(gif);
};
