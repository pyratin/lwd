'use strict';

import nodeFetch from 'node-fetch';

import fnDelayRunFn from './fnDelayRun';

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
  text,
  index
) => {

  const gifyApiKey = 
    process.env.npm_package_config_GIFY_API_KEY;

  return `
    https://api.giphy.com/v1/gifs/translate?api_key=${
      gifyApiKey
    }&weirdness:=${
      index
    }&s=${
      text
    }
  `
    .trim();
};

const fnDelayRun = (
  text
) => {

  return fnDelayRunFn(
    cardsFlatlistGifyUrlAssignedGetFn,
    0,
    `
      deckCardsGifyUrlAssignedGet: ${
        text
      }
    `
      .trim(),
    {
      text
    }
  );
};

const cardsFlatlistGifyUrlAssignedGetFn = (
  {
    text: _text
  },
  title,
  index
) => {

  const text = `
    ${
      _text
    } : ${
      title
    }
  `
    .trim();

  return nodeFetch(
    queryGet(
      encodeURIComponent(
        text
      ),
      index
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
          'downsized_still'
        ]
          .url;

        if (
          !gifyUrl
        ) {

          return fnDelayRun(
            text
          );
        }

        return (
          gifyUrl
        );
      }
    )
    .catch(
      () => {

        return fnDelayRun(
          text
        );
      }
    );
};

const cardsFlatlistGifyUrlAssignedGet = (
  cards,
  title
) => {

  return cards.reduce(
    (
      memo,
      card,
      index
    ) => {

      return memo.then(
        (
          res
        ) => {

          return cardsFlatlistGifyUrlAssignedGetFn(
            card,
            title,
            index
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
  _cards,
  title
) => {

  let cardsFlatlist = cardsForGifyGet(
    _cards
  );

  cardsFlatlist = await cardsFlatlistGifyUrlAssignedGet(
    cardsFlatlist,
    title
  );

  const cards = cardsGifyUrlAssignedGet(
    cardsFlatlist,
    _cards
  );

  return (
    cards
  );
};
