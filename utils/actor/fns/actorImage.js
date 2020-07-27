'use strict';

import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import {
  ObjectID
} from 'mongodb';
import {
  exec
} from 'child_process';

import {
  actorImageCreate
} from '~/js/server/data/actorImage';

const imageFormatGet = (
  imagePath
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return exec(
        `
          identify ${
            imagePath
          }
        `
          .trim(),
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
            stdout.split(
              /\s/
            )[
              1
            ]
              .toLowerCase()
          );
        }
      );
    }
  );
};

const imageJpegGet = (
  base64,
  format
) => {

  const buffer = new Buffer.from(
    base64,
    'base64'
  );

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        `
          convert ${
            format
          }:- jpeg:-
        `,
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

const imageResize = (
  base64
) => {

  const buffer = new Buffer.from(
    base64,
    'base64'
  );

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const res = 480;

      const proc = exec(
        `
          convert jpeg:- -resize ${
            res
          }x${
            res
          }^ -gravity center -crop ${
            res
          }x${
            res
          }+0+0 jpeg:-
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

const actorImagesGetFn = (
  actorImagePath
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        actorImagePath,
        'base64',
        async (
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

          const format = await imageFormatGet(
            actorImagePath
          );

          let _base64 = res;

          if (
            format !==
            'jpeg'
          ) {

            _base64 = await imageJpegGet(
              _base64,
              format
            );
          }

          _base64 = await imageResize(
            _base64
          );

          const base64 = `
            data:image/jpeg;base64,${
              _base64
            }
          `
            .trim();

          return resolve(
            base64
          );
        }
      );
    }
  );
};

const actorImagesGet = (
  actorImagePaths
) => {

  return actorImagePaths.reduce(
    (
      memo,
      actorImagePath
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorImagesGetFn(
            actorImagePath
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

const _actorImagesCreateFn = (
  actorImages,
  actorId,
  db
) => {

  return actorImages.reduce(
    (
      memo,
      base64
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorImageCreate(
            {
              _actorId: new ObjectID(
                actorId
              ),
              base64
            },
            db
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

const actorImagesCreateFn = async (
  actorId,
  actorImagesFolderPath,
  db
) => {

  const actorImagePaths = [
    ...shelljs.ls(
      actorImagesFolderPath
    )
  ]
    .map(
      (
        actorImage
      ) => {

        return path.join(
          actorImagesFolderPath,
          actorImage
        );
      }
    );

  const actorImages = await actorImagesGet(
    actorImagePaths
  );

  return _actorImagesCreateFn(
    actorImages,
    actorId,
    db
  );
};

const actorImagesCreate = (
  actors,
  actorsSourceFolderPathString,
  db
) => {

  return actors.reduce(
    (
      memo,
      {
        _id: actorId,
        text: actorText
      }
    ) => {

      return memo.then(
        (
          res
        ) => {

          const actorImagesFolderPath = path.join(
            process.cwd(),
            actorsSourceFolderPathString,
            actorText
          );

          return actorImagesCreateFn(
            actorId,
            actorImagesFolderPath,
            db
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  ...result
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

export {
  actorImagesCreate
};
