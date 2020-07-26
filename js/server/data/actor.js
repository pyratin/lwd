'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOneAndUpdate,
  findOneAndDelete
} from './index';
import {
  actorImagesByActorIdRemove
} from './actorImage';

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
  actor,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: actor
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

const _actorsRemoveFn = (
  {
    _id: actorId
  },
  db
) => {

  return actorRemove(
    actorId,
    db
  )
    .then(
      (
        {
          _id: actorId
        }
      ) => {

        return actorImagesByActorIdRemove(
          actorId,
          db
        );
      }
    );
};

const actorsRemoveFn = (
  actors,
  db
) => {

  return actors.reduce(
    (
      memo,
      actor
    ) => {

      return memo.then(
        (
          res
        ) => {

          return _actorsRemoveFn(
            actor,
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

const actorsBySetIdRemove = (
  setId,
  db
) => {

  return actorsFind(
    {
      _setId: new ObjectID(
        setId
      )
    },
    null,
    db
  )
    .then(
      (
        actors
      ) => {

        return actorsRemoveFn(
          actors,
          db
        );
      }
    );
};

export {
  actorsFind,
  actorCreate,
  actorRemove,
  actorsBySetIdRemove
};
