'use strict';

import fs from 'fs';
import path from 'path';

export default () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.mkdir(
        path.join(
          process.cwd(),
          'media/output'
        ),
        {},
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
            res
          );
        }
      );
    }
  );
};
