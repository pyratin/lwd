'use strict';

import nodeFetch from 'node-fetch';

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
        !card?.character?.text
      ) {

        return [
          ...cardMemo,
          {
            ...card,
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

  const gifyApiKey = 
    process.env.npm_package_config_GIFY_API_KEY;

  return `
    https://api.giphy.com/v1/gifs/translate?api_key=${
      gifyApiKey
    }&weirdness:=10&s=${
      text
    }
  `
    .trim();
};

const cardsFlatlistGifyUrlAssignedGetFn = (
  {
    text
  }
) => {

  return nodeFetch(
    queryGet(
      encodeURIComponent(
        text
      )
    )
  )
    .then(
      (
        res
      ) => {

        return res.json();
      }
    )
    .then(
      (
        json
      ) => {

        const gifyUrl = json.data.images?.[
          '480w_still'
        ]
          .url;

        if (
          !gifyUrl
        ) {

          //eslint-disable-next-line no-console
          console.log(
            `
              cardsFlatlistGifyUrlAssignedGetFn: ${
                text
              }
            `
              .trim()
          );

          return cardsFlatlistGifyUrlAssignedGetFn(
            {
              text
            }
          );
        }

        return (
          gifyUrl
        );
      }
    );
};

const cardsFlatlistGifyUrlAssignedGet = (
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

          return cardsFlatlistGifyUrlAssignedGetFn(
            card
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  {
                    ...card,
                    gifyUrl: result
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

const cardsGifyUrlAssignedGet = (
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
            gifyUrl: _cardsFlatlist.gifyUrl
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

  cardsFlatlist = await cardsFlatlistGifyUrlAssignedGet(
    cardsFlatlist
  );

  const cards = cardsGifyUrlAssignedGet(
    cardsFlatlist,
    _cards
  );

  return (
    cards
  );
};
