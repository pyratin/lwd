'use strict';

import charactersGet from './charactersGet';
import segmentsGet from './segmentsGet';
import deckSegmentsGet from './deckSegmentsGet';
import deckCharactersGet from './deckCharactersGet';

export default async (
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

  const deckCharacters = await deckCharactersGet(
    deckSegments,
    movie.plotText
  );
};
