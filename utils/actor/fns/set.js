'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  setCreate as setCreateFn
} from '~/js/server/data/set';
import {
  actorsCreate
} from './actor';

const setCreate = (
  text,
  genreId,
  actorsSourceFolderPathString,
  db
) => {

  return setCreateFn(
    {
      text,
      _genreId: new ObjectID(
        genreId
      )
    },
    db
  )
    .then(
      (
        {
          _id: setId
        }
      ) => {

        return actorsCreate(
          setId,
          actorsSourceFolderPathString,
          db
        );
      }
    );
};

export {
  setCreate
};
