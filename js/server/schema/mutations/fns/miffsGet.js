'use strict';

import {
  exec
} from 'child_process';

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
        'convert jpeg:- miff:-',
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

export default (
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
