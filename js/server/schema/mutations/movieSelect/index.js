'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import movieDataExtendedGet from 
  '../fns/movieDataExtendedGet';
import {
  movieCreate
} from '~/js/server/data/movie';
import movieWrite from '../fns/movieWrite';

export default async (
  title,
  db
) => {

  let movieDataBasic = await movieDataBasicGet(
    title
  );

  const movieDataExtended = await movieDataExtendedGet(
    movieDataBasic,
    db
  );

  const movie = await movieCreate(
    movieDataExtended,
    db
  );

  await movieWrite(
    movie
  );

  return (
    movie
  );
};
