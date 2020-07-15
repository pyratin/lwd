'use strict';

import fs from 'fs';
import path from 'path';

const outputFolderPathString = 'media/output';

export default (
  (
    {
      _id: movieId,
      gif
    }
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        const outputPath = path.join(
          process.cwd(),
          outputFolderPathString,
          `
            ${
              movieId
            }.gif
          `
            .trim()
        );

        return fs.writeFile(
          outputPath,
          gif.replace(
            /^data:image\/gif;base64,/,
            ''
          ),
          'base64',
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
  }
);
