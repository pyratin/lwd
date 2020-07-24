'use strict';

import path from 'path';
import {
  exec
} from 'child_process';

const base64FilterAppliedGetFn = (
  base64,
  filter
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const buffer = new Buffer.from(
        base64.replace(
          /^data:image\/(jpeg|png);base64,/,
          ''
        ),
        'base64'
      );

      const filterPath = path.join(
        process.cwd(),
        'js/server/schema/mutations/fns',
        filter
      );

      const proc = exec(
        `
          ${
            filterPath
          } - jpeg:-
        `
          .trim(),
        {
          encoding: 'base64'
        },
        (
          error,
          res
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
                res
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

export default async (
  _base64
) => {

  const base64 = await [
    'vintage3',
    'vignette3'
  ]
    .reduce(
      (
        memo,
        filter
      ) => {

        return memo.then(
          (
            res
          ) => {

            return base64FilterAppliedGetFn(
              res,
              filter
            )
              .then(
                (
                  result
                ) => {

                  return (
                    result
                  );
                }
              );
          }
        );
      },
      Promise.resolve(
        _base64
      )
    );

  return (
    base64
  );
};
