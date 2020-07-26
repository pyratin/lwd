'use strict';

import {
  setCreate as _setCreate,
  setsFind,
  setRemove
} from '~/js/server/data/set';
import {
  actorsCreate
} from './actor';

const setCreateFn = (
  text,
  genre,
  db
) => {

  return _setCreate(
    {
      text,
      genre
    },
    db
  );
};

const setCreate = async (
  setText,
  genre,
  actorsSourceFolderPathString,
  db
) => {

  const set = await setCreateFn(
    setText,
    genre,
    db
  );

  await actorsCreate(
    set,
    actorsSourceFolderPathString,
    db
  );

  return (
    set
  );
};

const _setsRemoveFn = (
  set,
  db
) => {

  return setRemove(
    set._id,
    db
  );
};

const setsRemoveFn = (
  sets,
  db
) => {

  return sets.reduce(
    (
      memo,
      set
    ) => {

      return memo.then(
        (
          res
        ) => {

          return _setsRemoveFn(
            set,
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

const setsRemove = (
  db
) => {

  return setsFind(
    null,
    null,
    db
  )
    .then(
      (
        sets
      ) => {

        return setsRemoveFn(
          sets,
          db
        );
      }
    );
};

export {
  setCreate,
  setsRemove
};
