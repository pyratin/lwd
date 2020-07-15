'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  findOneAndUpdate
} from './index';

const movieCollectionName = 'movies';

const movieCreate = (
  movie,
  db
) => {

  return findOneAndUpdate(
    {
      _id: new ObjectID()
    },
    {
      $set: movie
    },
    {
      upsert: true,
      returnOriginal: false
    },
    movieCollectionName,
    db
  );
};

export {
  movieCreate
};
