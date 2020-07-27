'use strict';

import {
  findOneAndUpdate
} from './index';

const movieCollectionName = 'movies';

const movieCreate = (
  filter,
  update,
  options = {
    upsert: true,
    returnOriginal: false
  },
  db,
) => {

  return findOneAndUpdate(
    filter,
    update,
    options,
    movieCollectionName,
    db
  );
};

export {
  movieCreate
};
