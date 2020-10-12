'use strict';

import movieCreate 
  from '~/js/server/schema/mutations/movieCreate';
import {
  hostUrlGet,
  outputResGet
} from './variable';

export default async (
  db,
  req,
  res
) => {

  const deckId = req.params.deckId;

  const hero = req.query.hero;

  const deck = await movieCreate(
    `
      id:${
        deckId
      }
    `
      .trim(),
    {},
    db,
    req
  );

  return res.render(
    'index',
    {
      title: `
        ${
          hero
        } in ${
          deck.splash.title
        }
      `,
      url: hostUrlGet(
        req
      ),
      image: {
        path: deck.splash.poster,
        width: outputResGet(),
        height: outputResGet()
      }
    }
  );
};
