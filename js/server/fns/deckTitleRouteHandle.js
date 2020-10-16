'use strict';

import {
  genreGet,
  heroGet,
  hostUrlGet,
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

  let url = `
    ${
      hostUrlGet(
        req
      )
    }${
      req.path
    }
  `
    .trim();

  let queryString = `
    ?genre=${
      genre
    }&hero=${
      hero
    }
  `
    .trim();

  url = `
    ${
      url
    }${
      queryString
    }
  `
    .trim();

  return res.render(
    'index',
    {
      fbAppId: fbAppIdGet(),
      title: `
        ${
          movie.hero
        } in ${
          movie.title
        }
      `,
      description: movie.description,
      type: 'article',
      url: url,
      image: {
        url: movie.url,
        type: 'image/gif',
        width: outputResGet(),
        height: outputResGet()
      }
    }
  );
};
