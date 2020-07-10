'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import movieDataExtendedGet from 
  '../fns/movieDataExtendedGet';

export default async (
  title,
  db
) => {

  let movie = await movieDataBasicGet(
    title
  );

  const movieDataExtended = await movieDataExtendedGet(
    movie,
    db
  );

  return (
    movieDataExtended
  );
};
