'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  findOneAndUpdate
} from './index';

const actorImageCollectionName = 'actorImages';

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

export default {
  actorImageCreate
};
