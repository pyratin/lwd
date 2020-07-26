'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOne,
  findOneAndUpdate,
  findOneAndDelete
} from './index';
import {
  actorsBySetIdRemove
} from './actor';

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

const setFindOne = (
  query,
  options,
  db
) => {

  return findOne(
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
  )
    .then(
      (
        {
          _id: setId
        }
      ) => {

        return actorsBySetIdRemove(
          setId,
          db
        );
      }
    );
};

export {
  setsFind,
  setFindOne,
  setCreate,
  setRemove
};
