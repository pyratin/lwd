'use strict';

import path from 'path';
import shelljs from 'shelljs';
import {
  ObjectID
} from 'mongodb';

import {
  actorCreate
} from '~/js/server/data/actor';

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
  setId,
  actorsSourceFolderPathString,
  db
) => {

  return actorCreate(
    {
      text,
      _setId: new ObjectID(
        setId
      ),
      gender: text.split(
        /-/
      )[
        0
      ]
    },
    db
  );
};

const actorsCreate = (
  setId,
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
            setId,
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

export {
  actorsCreate
};
