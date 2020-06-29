'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';

export default (
  movie
) => {

  const characters = charactersGet(
    movie.cast,
    movie.plot
  );

  const segments = segmentsGet(
    movie.plot,
    characters
  );
};
