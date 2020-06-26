'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import movieDataExtendedGet from '../fns/movieDataExtendedGet';

export default async (
  title
) => {

  let movie = await movieDataBasicGet(
    title
  );

  const movieDataExtended = movieDataExtendedGet(
    movie
  );
};
