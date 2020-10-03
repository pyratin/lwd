'use strict';

import {
  deckConnectionGet
} from '~/js/server/data/deck';

export default (
  deckId,
  connectionArgs,
  db
) => {

  return deckConnectionGet(
    deckId,
    connectionArgs,
    db
  );
};
