'use strict';

import nodeFetch from 'node-fetch';

import nodeFetchFn from './nodeFetch';

const cardsForGifyGet = (
  cards
) => {

  return cards.reduce(
    (
      cardMemo,
      card,
      cardIndex
    ) => {

      if (
        !card.character
      ) {

        return [
          ...cardMemo,
          {
            text: card.text
              .reduce(
                (
                  textMemo,
                  {
                    text
                  }
                ) => {

                  return `
                    ${
                      textMemo.trim()
                    } ${
                      text.trim()
                    }
                  `
                    .trim();
                },
                ''
              ),
            cardIndex
          }
        ];
      }

      return (
        cardMemo
      );
    },
    []
  );
};

const queryGet = (
  text
) => {

  return `
    http://api.giphy.com/v1/gifs/search?api_key=${
      process.env.npm_package_config_GIFY_API_KEY
    }&limit=1&rating=pg-13&q=${
      text
    }
  `
    .trim();
};

const _base64AssignedGetFn = (
  url
) => {

  return nodeFetch(
    url
  )
    .then(
      (
        res
      ) => {

        return res.buffer();
      }
    )
    .then(
      (
        buffer
      ) => {

        return `
          data:image/jpeg;base64,${
            buffer.toString(
              'base64'
            )
          }
        `
          .trim();
      }
    );
};

const base64AssignedGetFn = (
  {
    text
  }
) => {

  return nodeFetchFn(
    queryGet(
      text
    )
  )
    .then(
      (
        res
      ) => {

        return (
          res.data[
            0
          ]
            .images.original_still.url
        );
      }
    )
    .then(
      (
        url
      ) => {

        return _base64AssignedGetFn(
          url
        );
      }
    );
};

const base64AssignedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      return memo.then(
        (
          res
        ) => {

          return base64AssignedGetFn(
            card
          )
            .then(
              (
                base64
              ) => {

                return [
                  ...res,
                  {
                    ...card,
                    base64
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
  );
};

export default async (
  _cards
) => {

  let cards = cardsForGifyGet(
    _cards
  );

  cards = await base64AssignedGet(
    cards
  );

  return (
    _cards
  );
};
