'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  movieFindOne
} from '~/js/server/data/movie';
import movieWrite from 
  '~/js/server/schema/mutations/fns/movieWrite';

export default async (
  db,
  req,
  res
) => {

  const movieId = req.params.movieGif
    .match(
      /^\w{24}/
    )[
      0
    ];

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

  return res.redirect(
    req.path
  );
};
