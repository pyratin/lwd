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

  const genre = req.query.genre;

  const hero = req.query.hero;

  const deck = await movieCreate(
    `
      id:${
        deckId
      }
    `
      .trim(),
    {
      spoofInput: {
        hero
      },
      genre
    },
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
      description: deck.cards[
        0
      ]
        .text,
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
