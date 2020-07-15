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

const actorImageFindOne = (
  query,
  options,
  db
) => {

  return findOne(
    query,
    options,
    actorImageCollectionName,
    db
  );
};

const actorImageCreate = (
  actorImage,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: actorImage
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
  actorImageFindOne,
  actorImageCreate,
  actorImageRemove
};
