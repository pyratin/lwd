'use strict';

import fs from 'fs';
import path from 'path';

const outputFolderPathString = 'media/output';

export default (
  (
    {
      _id: movieId,
      base64
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
          base64.replace(
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
