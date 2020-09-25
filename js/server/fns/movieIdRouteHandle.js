'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  movieFindOne
} from '~/js/server/data/movie';
import movieWrite from 
  '~/js/server/schema/mutations/fns/movieWrite';
import {
  outputResGet
} from './variable';

export default async (
  db,
  req,
  res
) => {

  const movieId = req.params.movieId;

  const movie = await movieFindOne(
    {
      _id: new ObjectID(
        movieId
      )
    },
    undefined,
    db
  );

  await movieWrite(
    movie
  );

  return res.render(
    'index',
    {
      title: movie.title,
      image: {
        path: movie.path,
        width: outputResGet(),
        height: outputResGet()
      }
    }
  );
};
