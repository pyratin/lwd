'use strict';

import {
  findOne,
  findOneAndUpdate
} from './index';

const deckCollectionName = 'decks';

const deckFindOne = (
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
    deckCollectionName,
    db
  );
};

const deckCreate = (
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
    deckCollectionName,
    db
  );
};

export {
  deckFindOne,
  deckCreate
};
