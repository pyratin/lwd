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
  setsByGenreIdRemove
} from './set';

const genreCollectionName = 'genre';

const genresFind = (
  query,
  options,
  db
) => {

  return find(
    query,
    options,
    genreCollectionName,
    db
  );
};

const genreFindOne = (
  query,
  options,
  db
) => {

  return findOne(
    query,
    options,
    genreCollectionName,
    db
  );
};

const genreCountDocuments = (
  query,
  options,
  db
) => {

  return countDocuments(
    query,
    options,
    genreCollectionName,
    db
  );
};

const genreCreate = (
  genre,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: genre
    },
    {
      upsert: true,
      returnOriginal: false
    },
    genreCollectionName,
    db
  );
};

const genreRemove = (
  genreId,
  db
) => {

  return findOneAndDelete(
    {
      _id: new ObjectID(
        genreId
      )
    },
    {
      returnOriginal: true
    },
    genreCollectionName,
    db
  )
    .then(
      (
        {
          _id: genreId
        }
      ) => {

        return setsByGenreIdRemove(
          genreId,
          db
        );
      }
    );
};

const genresRemove = (
  db
) => {

  return genresFind(
    null,
    null,
    db
  )
    .then(
      (
        memo,
        {
          _id: genreId
        }
      ) => {

        return memo.then(
          (
            res
          ) => {

            return genreRemove(
              genreId,
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

export {
  genresFind,
  genreFindOne,
  genreCountDocuments,
  genreCreate,
  genreRemove,
  genresRemove
};
