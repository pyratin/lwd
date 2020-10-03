'use strict';

import {
  deckConnectionGet
} from '~/js/server/data/deck';
import movieCreate from 
  '~/js/server/schema/mutations/movieCreate';

export default (
  deckId,
  connectionArgs,
  db
) => {

  return deckConnectionGet(
    deckId,
    connectionArgs,
    db
  )
    .then(
      async (
        deckConnection
      ) => {

        return {
          ...deckConnection,
          edges: await deckConnection.edges.reduce(
            (
              memo,
              edge
            ) => {

              return memo.then(
                (
                  res
                ) => {

                  return movieCreate(
                    `
                      id:${
                        edge.node._id
                      }
                    `
                      .trim(),
                    {
                      spoofInput: {
                        hero: '____',
                        villain: 'bombay-terrorist'
                      },
                      genre: 'general'
                    },
                    db,
                    undefined
                  )
                    .then(
                      (
                        deck
                      ) => {

                        return [
                          ...res,
                          {
                            ...edge,
                            node: deck
                          }
                        ];
                      }
                    );
                }
              );
            },
            Promise.resolve(
              []
            )
          )
        };
      }
    );
};
