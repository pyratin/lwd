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

const actorImageRemoveFn = (
  {
    _id: actorImageId
  },
  db
) => {

  return actorImageRemove(
    actorImageId,
    db
  );
};

const actorImagesRemoveFn = (
  actorImages,
  db
) => {

  return actorImages.reduce(
    (
      memo,
      actorImage
    ) => {

      return memo.then(
        (
          res
        ) => {

          return actorImageRemoveFn(
            actorImage,
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

const actorImagesByActorIdRemove = (
  actorId,
  db
) => {

  return actorImagesFind(
    {
      _actorId: new ObjectID(
        actorId
      )
    },
    {
      projection: {
        _id: 1
      },
      sort: {},
      skip: 0,
      limit: 0
    },
    db
  )
    .then(
      (
        actorImages
      ) => {

        return actorImagesRemoveFn(
          actorImages,
          db
        );
      }
    );
};

export {
  actorImagesFind,
  actorImageFindOne,
  actorImageCreate,
  actorImageRemove,
  actorImagesByActorIdRemove
};
