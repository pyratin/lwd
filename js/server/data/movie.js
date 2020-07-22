'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  findOneAndUpdate
} from './index';
import {
  hostUrlGet
} from '~/js/server/fns/variable';

const movieCollectionName = 'movies';

const movieCreate = (
  movie,
  db,
  req
) => {

  const movieId = new ObjectID();

  const path = `
    ${
      hostUrlGet(
        req
      )
    }/output/${
      movieId.toString()
    }.gif
  `
    .trim();

  return findOneAndUpdate(
    {
      _id: movieId
    },
    {
      $set: {
        ...movie,
        path
      }
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
