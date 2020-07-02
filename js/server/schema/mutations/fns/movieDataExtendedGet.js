'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import deckSegmentsGet from './deckSegmentsGet';
import deckCharactersGet from './deckCharactersGet';

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

  const deckSegments = deckSegmentsGet(
    segments
  );

  const deckCharacters = deckCharactersGet(
    deckSegments,
    movie.plotText
  );
};
