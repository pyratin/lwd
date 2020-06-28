'use strict';

import movieDataExtendedCastGet from './movieDataExtendedCastGet';

export default (
  movie
) => {

  const cast = movieDataExtendedCastGet(
    movie.cast,
    movie.plot
  );
};
