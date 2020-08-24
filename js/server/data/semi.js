'use strict';

import {
  findOne,
  findOneAndUpdate
} from './index';

const semiCollectionName = 'semis';

const semiFindOne = (
  query,
  options = {
    projection: {},
    sort: {}
  },
  db
) => {

  return findOne(
    query,
    options,
    semiCollectionName,
    db
  );
};

const semiCreate = (
  filter,
  update,
  options = {
    upsert: true,
    returnOriginal: false
  },
  db
) => {

  return findOneAndUpdate(
    filter,
    update,
    options,
    semiCollectionName,
    db
  );
};

export {
  semiFindOne,
  semiCreate
};
