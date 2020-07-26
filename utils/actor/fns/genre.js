'use strict';

import {
  genreCreate as genreCreateFn,
  genresRemove as genresRemoveFn
} from '~/js/server/data/genre';

const genreCreate = (
  text,
  db
) => {

  return genreCreateFn(
    {
      text
    },
    db
  );
};

const genresRemove = (
  db
) => {

  return genresRemoveFn(
    db
  );
};

export {
  genreCreate,
  genresRemove
};
