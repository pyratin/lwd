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
  query = {},
  options = {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  },
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
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: {
        text
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

const actorDelete = (
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
  actorDelete
};
