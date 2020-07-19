'use strict';

import {
  exec
} from 'child_process';
import splashRenderedGet from './splashRenderedGet';
import base64TextCompositedGet from './base64TextCompositedGet';
import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

import {
  outputResGet
} from '~/js/server/fns/variable';

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

          const character = card.character;

          let text = card.text;

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

          return base64TextCompositedGet(
            card.base64,
            text,
            outputResGet(),
            20,
            10
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
  miffStreamsConcated
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert -loop 0 -delay 1000 miff:- gif:-',
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

      miffStreamsConcated.pipe(
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
        'convert gif:- -coalesce -fuzz 5% -layers OptimizeFrame +map gif:-',
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
              data:image/gif;base64,${
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
  splash,
  base64s
) => {

  const input = (
    splash
  ) ?
    [
      splash,
      ...base64s
    ] :
    base64s;

  let miffStreamsConcated = await base64MiffStreamsConcatedGet(
    input
  );

  let gif = await gifGetFn(
    miffStreamsConcated
  );

  gif = await gifOptimizedGet(
    gif
  );

  return (
    gif
  );
};

export default async (
  movieTitle,
  moviePoster,
  _cards
) => {

  const base64s = await cardsRenderedGet(
    _cards
  );

  const splash = await splashRenderedGet(
    movieTitle,
    moviePoster,
    _cards
  );

  const gif = await gifGet(
    splash,
    base64s
  );

  return (
    gif
  );
};