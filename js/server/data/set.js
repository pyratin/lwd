'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  find,
  findOne,
  countDocuments,
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

const setCountDocuments = (
  query,
  options,
  db
) => {

  return countDocuments(
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

const setsByGenreIdRemove = (
  genreId,
  db
) => {

  return setsFind(
    {
      _genreId: new ObjectID(
        genreId
      )
    },
    null,
    db
  )
    .then(
      (
        sets
      ) => {

        return sets.reduce(
          (
            memo,
            {
              _id: setId
            }
          ) => {

            return memo.then(
              (
                res
              ) => {

                return setRemove(
                  setId,
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
      }
    );
};

export {
  setsFind,
  setFindOne,
  setCountDocuments,
  setCreate,
  setRemove,
  setsByGenreIdRemove
};
