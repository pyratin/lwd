'use strict';

import {
  exec
} from 'child_process';

import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

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

  let miffStreamsConcated = 
  await base64MiffStreamsConcatedGet(
    input
  );

  let gif = await gifGetFn(
    miffStreamsConcated
  );

  return (
    gif
  );
};

export default async (
  deck
) => {

  const cardBase64s = deck.cards
    .map(
      (
        {
          base64
        }
      ) => {

        return (
          base64
        );
      }
    );

  const splash = deck.splash.base64;

  const gif = await gifGet(
    splash,
    cardBase64s
  );

  return (
    gif
  );
};
