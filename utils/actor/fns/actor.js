'use strict';

import path from 'path';
import shelljs from 'shelljs';
import {
  ObjectID
} from 'mongodb';

import {
  actorsFind,
  actorCreate,
  actorRemove
} from '~/js/server/data/actor';
import {
  actorImagesCreate,
  actorImagesRemove
} from './actorImage';

const actorTextsGet = (
  actorsSourceFolderPathString
) => {

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

const actorsCreateFn = (
  text,
  set,
  actorsSourceFolderPathString,
  db
) => {

  return actorCreate(
    {
      text,
      _setId: new ObjectID(
        set._id
      ),
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
          actorsSourceFolderPathString,
          db
        );
      }
    );
};

const actorsCreate = (
  set,
  actorsSourceFolderPathString,
  db
) => {

  const actorTexts = actorTextsGet(
    actorsSourceFolderPathString
  );

  return actorTexts.reduce(
    (
      memo,
      actorText
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorsCreateFn(
            actorText,
            set,
            actorsSourceFolderPathString,
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
  set,
  db
) => {

  return actorsFind(
    {
      _setId: new ObjectID(
        set._id
      )
    },
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

export {
  actorsCreate,
  actorsRemove
};
