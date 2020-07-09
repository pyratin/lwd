'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOneAndUpdate,
  findOneAndDelete
} from './index';

const actorImageCollectionName = 'actorImages';

const actorImagesFind = (
  query,
  options,
  db
) => {

  return find(
    query,
    options,
    actorImageCollectionName,
    db
  );
};

const actorImageCreate = (
  actorId,
  base64,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: {
        _actorId: new ObjectID(
          actorId
        ),
        base64
      }
    },
    {
      upsert: true,
      returnOriginal: false
    },
    actorImageCollectionName,
    db
  );
};

const actorImageRemove = (
  actorImageId,
  db
) => {

  return findOneAndDelete(
    {
      _id: new ObjectID(
        actorImageId
      )
    },
    {
      returnOriginal: true
    },
    actorImageCollectionName,
    db
  );
};

export {
  actorImagesFind,
  actorImageCreate,
  actorImageRemove
};
