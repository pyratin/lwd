'use strict';

import path from 'path';
import shelljs from 'shelljs';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  actorsFind,
  actorCreate,
  actorDelete
} from '~/js/server/data/actor';

const actorsSourceFolderPathString = 'utils/actor/source';

const _actorsDeleteFn = (
  {
    _id: actorId
  },
  db
) => {

  return actorDelete(
    actorId,
    db
  );
};

const actorsDeleteFn = (
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

          return _actorsDeleteFn(
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

const actorsDelete = (
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

        return actorsDeleteFn(
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

const actorImagesCreate = (
  actor,
  db
) => {

};

const actorsCreateFn = (
  text,
  db
) => {

  return actorCreate(
    text,
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

    await actorsDelete(
      db
    );

    const actors = actorsGet();

    await actorsCreate(
      actors,
      db
    );
  }
)();
