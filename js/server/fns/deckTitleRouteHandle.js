'use strict';

import {
  genreGet,
  heroGet,
  outputResGet,
  fbAppIdGet
} from './variable';
import movieCreate 
  from '~/js/server/schema/mutations/movieCreate';

export default async (
  db,
  req,
  res
) => {

  const deckTitle = req.params.deckTitle;

  const genre = req.query.genre || 
    genreGet();

  const hero = req.query.hero ||
    heroGet();

  const movie = await movieCreate(
    deckTitle,
    {
      spoofInput: {
        hero
      },
      genre,
      outputType: 'movie',
      createFlag: true
    },
    db,
    req
  );
  console.log(movie.title, movie.url, movie.path);

  return res.render(
    'index',
    {
      title: `
        ${
          movie.hero
        } in ${
          movie.title
        }
      `,
      description: movie.description,
      type: 'article',
      url: movie.url,
      image: {
        path: movie.path,
        type: 'image/gif',
        width: outputResGet(),
        height: outputResGet()
      },
      fbAppId: fbAppIdGet()
    }
  );
};
