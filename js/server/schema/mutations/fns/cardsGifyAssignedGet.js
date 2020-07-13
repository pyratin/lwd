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
    }&limit=25&rating=pg-13&q=${
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

const cardsFlatlistGifyBase64AssignedGetFn = (
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

        const randomIndex = Math.floor(
          Math.random() *
          res.data.length
        );

        const url = res.data
          .reduce(
            (
              memo,
              _data,
              index
            ) => {

              if (
                !memo &&
                (
                  index ===
                  randomIndex
                )
              ) {

                return (
                  _data.images[
                    '480w_still'
                  ]
                    .url
                );
              }

              return (
                memo
              );
            },
            null
          );

        return (
          url
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

const cardsFlatlistGifyBase64AssignedGet = (
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

          return cardsFlatlistGifyBase64AssignedGetFn(
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

const cardByIndexGet = (
  cards,
  cardIndex
) => {

  return cards.find(
    (
      card
    ) => {

      return (
        card.cardIndex ===
        cardIndex
      );
    }
  );
};

const cardsGifyBase64AssignedGet = (
  cardsFlatlist,
  cards
) => {

  return cards.reduce(
    (
      memo,
      card,
      cardIndex
    ) => {

      const _cardsFlatlist = cardByIndexGet(
        cardsFlatlist,
        cardIndex
      );

      if (
        _cardsFlatlist
      ) {

        return [
          ...memo,
          {
            ...card,
            base64: _cardsFlatlist.base64
          }
        ];
      }

      return [
        ...memo,
        card
      ];
    },
    []
  );
};

export default async (
  _cards
) => {

  let cardsFlatlist = cardsForGifyGet(
    _cards
  );

  cardsFlatlist = await cardsFlatlistGifyBase64AssignedGet(
    cardsFlatlist
  );

  const cards = cardsGifyBase64AssignedGet(
    cardsFlatlist,
    _cards
  );

  return (
    cards
  );
};
