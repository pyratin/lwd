'use strict';

import path from 'path';
import fs from 'fs';
import shelljs from 'shelljs';
import {
  ObjectID
} from 'mongodb';
import {
  exec
} from 'child_process';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  actorsFind,
  actorCreate,
  actorRemove
} from '~/js/server/data/actor';
import {
  actorImagesFind,
  actorImageCreate,
  actorImageRemove
} from '~/js/server/data/actorImage';

const actorsSourceFolderPathString = 'utils/actor/source';

const actorImageRemoveFn = (
  {
    _id: actorImageId
  },
  db
) => {

  return actorImageRemove(
    actorImageId,
    db
  );
};

const actorImagesRemoveFn = (
  actorImages,
  db
) => {

  return actorImages.reduce(
    (
      memo,
      actorImage
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorImageRemoveFn(
            actorImage,
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

const actorImagesRemove = (
  {
    _id: actorId
  },
  db
) => {

  return actorImagesFind(
    {
      _actorId: new ObjectID(
        actorId
      )
    },
    {
      projection: {
        _id: 1
      },
      sort: {},
      skip: 0,
      limit: 0
    },
    db
  )
    .then(
      (
        actorImages
      ) => {

        return actorImagesRemoveFn(
          actorImages,
          db
        );
      }
    );
};

const _actorsRemoveFn = (
  {
    _id: actorId
  },
  db
) => {

  return actorRemove(
    actorId,
    db
  )
    .then(
      (
        actor
      ) => {

        return actorImagesRemove(
          actor,
          db
        );
      }
    );
};

const actorsRemoveFn = (
  actors,
  db
) => {

  return actors.reduce(
    (
      memo,
      actor
    ) => {

      return memo.then(
        (
          res
        ) => {

          return _actorsRemoveFn(
            actor,
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

const actorsRemove = (
  db
) => {

  return actorsFind(
    null,
    null,
    db
  )
    .then(
      (
        actors
      ) => {

        return actorsRemoveFn(
          actors,
          db
        );
      }
    );
};

const actorsGet = () => {

  const actorsSourceFolderPath = path.join(
    process.cwd(),
    actorsSourceFolderPathString
  );

  return [
    ...shelljs.ls(
      actorsSourceFolderPath
    )
  ];
};

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
  actorImage,
  actor,
  db
) => {

  return actorImageCreate(
    {
      _actorId: new ObjectID(
        actor._id
      ),
      base64: actorImage
    },
    db
  );
};

const actorImagesCreateFn = (
  actorImages,
  actor,
  db
) => {

  return actorImages.reduce(
    (
      memo,
      actorImage
    ) => {

      return memo.then(
        (
          res
        ) => {

          return _actorImagesCreateFn(
            actorImage,
            actor,
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

const actorImagesCreate = async (
  actor,
  db
) => {

  const actorImagesFolderPath = path.join(
    process.cwd(),
    actorsSourceFolderPathString,
    actor.text
  );

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

  return actorImagesCreateFn(
    actorImages,
    actor,
    db
  );
};

const actorsCreateFn = (
  text,
  db
) => {


  return actorCreate(
    {
      text,
      gender: text.split(
        /-/
      )[
        0
      ]
    },
    db
  )
    .then(
      (
        actor
      ) => {

        return actorImagesCreate(
          actor,
          db
        );
      }
    );
};

const actorsCreate = (
  actors,
  db
) => {

  return actors.reduce(
    (
      memo,
      actor
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorsCreateFn(
            actor,
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

(
  async () => {

    const db = await mongoClientConnect();

    await actorsRemove(
      db
    );

    const actors = actorsGet();

    await actorsCreate(
      actors,
      db
    );

    // eslint-disable-next-line no-console
    console.log(
      `
        collectionInit: ${
          actors.length
        }
      `
        .trim()
    );
  }
)();
