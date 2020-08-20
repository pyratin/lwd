'use strict';

import path from 'path';
import {
  exec
} from 'child_process';
import shelljs from 'shelljs';

const grabThreshold = 0.3;

const escapedGet = (
  pathString  
) => {

  const regExp = /([() |])/g;

  return pathString.replace(
    regExp,
    '\\$1'
  );
};

export default (
  videoName,
  sourceFolderName,
  videosFolderPathString,
  sourceFolderPathString
) => {

  const videoFilePath = path.join(
    process.cwd(),
    videosFolderPathString,
    videoName
  );

  const sourceFolderPath = path.join(
    process.cwd(),
    sourceFolderPathString,
    sourceFolderName
  );

  shelljs.mkdir(
    sourceFolderPath
  );

  const command = `
   ffmpeg -i ${
    escapedGet(
      videoFilePath
    )
   } -filter_complex "select='gt(scene,${
    grabThreshold
   })',metadata=print:file=time.txt" -vsync vfr ${
    escapedGet(
      sourceFolderPath
    )
   }/img%03d.jpeg 
  `
    .trim();

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return exec(
        command,
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
