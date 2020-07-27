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
  setFolderPathString
) => {

  const setFolderPath = path.join(
    process.cwd(),
    setFolderPathString
  );

  return [
    ...shelljs.ls(
      setFolderPath
    )
  ];
};

const actorsCreateFn = (
  actorText,
  setId,
  db
) => {

  return actorCreate(
    {
      _id: new ObjectID()
    },
    {
      $set: {
        text: actorText,
        _setId: new ObjectID(
          setId
        ),
        gender: actorText.split(
          /-/
        )[
          0
        ]
      }
    },
    undefined,
    db
  );
};

const actorsCreate = (
  setId,
  setFolderPathString,
  db
) => {

  const actorTexts = actorTextsGet(
    setFolderPathString
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
