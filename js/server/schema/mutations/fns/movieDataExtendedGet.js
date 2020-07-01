'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import deckGet from './deckGet';

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

  const deck = deckGet(
    segments
  );
};
