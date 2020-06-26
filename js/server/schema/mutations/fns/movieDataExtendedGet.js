'use strict';

import movieDataExtendedCastGet from './movieDataExtendedCastGet';

export default (
  movie
) => {

  let cast = movieDataExtendedCastGet(
    movie.cast
  );
};
