'use strict';

import path from 'path';
import fs from 'fs';
import shelljs from 'shelljs';
import {
  ObjectID
} from 'mongodb';

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
    actor._id,
    actorImage,
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
    text,
    text.split(
      /-/
    )[
      0
    ],
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
