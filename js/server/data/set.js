'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOneAndUpdate,
  findOneAndDelete
} from './index';

const setCollectionName = 'sets';

const setsFind = (
  query,
  options,
  db
) => {

  return find(
    query,
    options,
    setCollectionName,
    db
  );
};

const setCreate = (
  set,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: set
    },
    {
      upsert: true,
      returnOriginal: false
    },
    setCollectionName,
    db
  );
};

const setRemove = (
  setId,
  db
) => {

  return findOneAndDelete(
    {
      _id: new ObjectID(
        setId
      )
    },
    {
      returnOriginal: true
    },
    setCollectionName,
    db
  );
};

export {
  setsFind,
  setCreate,
  setRemove
};
