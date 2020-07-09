'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOneAndUpdate,
  findOneAndDelete
} from './index';

const actorCollectionName = 'actors';

const actorsFind = (
  query,
  options,
  db
) => {

  return find(
    query,
    options,
    actorCollectionName,
    db
  );
};

const actorCreate = (
  text,
  gender,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: {
        text,
        gender
      }
    },
    {
      upsert: true,
      returnOriginal: false
    },
    actorCollectionName,
    db
  );
};

const actorRemove = (
  actorId,
  db
) => {

  return findOneAndDelete(
    {
      _id: new ObjectID(
        actorId
      )
    },
    {
      returnOriginal: true
    },
    actorCollectionName,
    db
  );
};

export {
  actorsFind,
  actorCreate,
  actorRemove
};
