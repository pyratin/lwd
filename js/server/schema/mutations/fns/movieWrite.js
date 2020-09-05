'use strict';

import fs from 'fs';
import path from 'path';

const outputFolderPathString = 'media/output';

export default (
  (
    movie
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
              movie._id
            }.gif
          `
            .trim()
        );

        return fs.writeFile(
          outputPath,
          movie.base64.replace(
            /^data:image\/gif;base64,/,
            ''
          ),
          'base64',
          (
            error
          ) => {

            if (
              error
            ) {

              return reject(
                error
              );
            }

            return resolve(
              movie
            );
          }
        );
      }
    );
  }
);
