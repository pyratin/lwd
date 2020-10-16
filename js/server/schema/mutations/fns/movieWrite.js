'use strict';

import fs from 'fs';
import path from 'path';

const outputFolderPathString = 'media/output';

export default (
  (
    movie
  ) => {

    const outputPath = path.join(
      process.cwd(),
      outputFolderPathString,
      `
        ${
          movie.title
        }_${
          movie.genre
        }_${
          movie.hero
        }.gif
      `
        .trim()
    );

    return new Promise(
      (
        resolve,
        reject
      ) => {

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
