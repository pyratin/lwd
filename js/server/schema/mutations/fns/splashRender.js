'use strict';

import fs from 'fs';
import path from 'path';
import nodeFetch from 'node-fetch';
import {
  exec
} from 'child_process';

import {
  outputResGet
} from '~/js/server/fns/variable';

const res = outputResGet();

const bgFilePathString = 'media/outputComponents/bg.jpeg';

const moviePosterBase64GetFn = (
  buffer
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const resHalf = res / 2;

      const proc = exec(
        `
          convert jpeg:- -resize ${
            resHalf
          }x${
            resHalf
          }^ jpeg:-
        `
          .trim(),
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

      proc.stdin.write(
        buffer
      );

      proc.stdin.end();
    }
  );
};

const moviePosterBase64Get = (
  moviePoster
) => {

  if (
    !moviePoster
  ) {

    return Promise.resolve(
      null
    );
  }

  return nodeFetch(
    moviePoster
  )
    .then(
      (
        res
      ) => {

        return res.buffer();
      }
    )
    .then(
      (
        buffer
      ) => {

        return moviePosterBase64GetFn(
          buffer
        );
      }
    );
};

const bgBase64Get = () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        path.join(
          process.cwd(),
          bgFilePathString
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
            `
              data:image/jpeg;base64,${
                res
              }
            `
              .trim()
          );
        }
      );
    }
  );
};

const moviePosterBgCompositedGet = (
  moviePosterBase64,
  bgBase64
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {


      return resolve();
    }
  );
};

const splashGet = async (
  moviePosterBase64
) => {

  if (
    !moviePosterBase64
  ) {

    return Promise.resolve(
      null
    );
  }

  let bgBase64 = await bgBase64Get();

  //bgBase64 = await moviePosterBgCompositedGet(
    //moviePosterBase64,
    //bgBase64
  //);

  return Promise.resolve(
    moviePosterBase64
  );
};


export default async (
  moviePoster
) => {

  const moviePosterBase64 = await moviePosterBase64Get(
    moviePoster
  );

  let splash = await splashGet(
    moviePosterBase64
  );

  return (
    splash
  );
};
