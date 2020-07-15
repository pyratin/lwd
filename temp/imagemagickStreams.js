'use strict';

import {
  exec
} from 'child_process';
import streamcat from 'streamcat';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  actorImagesFind
} from '~/js/server/data/actorImage';

const imagesRandomGet = (
  db
) => {

  return actorImagesFind(
    null,
    null,
    db
  )
    .then(
      (
        images
      ) => {

        const indexes = [
          10, 20
        ];

        return indexes.reduce(
          (
            memo,
            index
          ) => {

            return [
              ...memo,
              images[
                index
              ]
                .base64
            ];
          },
          []
        );
      }
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
        'convert jpeg:- -resize 100x100 miff:-',
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
        'convert -loop 0 -delay 250 miff:- gif:-',
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

      miffs.pipe(
        proc.stdin
      );
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

  const gif = await gifGetFn(
    miffs
  );

  return (
    gif
  );
};

(
  async(
  ) => {

    const db = await mongoClientConnect();

    const base64s = await imagesRandomGet(
      db
    );

    const gif = await gifGet(
      base64s
    );

    // eslint-disable-next-line no-console
    console.log(gif);
  }
)();
