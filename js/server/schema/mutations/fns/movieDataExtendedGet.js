'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import deckSegmentsGet from './deckSegmentsGet';
import deckThumbsGet from './deckThumbsGet';

export default async (
  movie
) => {

  let characters = await charactersGet(
    movie.cast,
    movie.plot,
    movie.plotText
  );

  const segments = segmentsGet(
    movie.plot,
    characters
  );

  const deckSegments = deckSegmentsGet(
    segments
  );

  const deckThumbs = deckThumbsGet(
    deckSegments,
    characters
  );
};
