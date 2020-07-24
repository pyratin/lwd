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

        const url = json.data.images?.[
          '480w_still'
        ]
          .url;

        if (
          !url
        ) {

          //eslint-disable-next-line no-console
          console.log(
            `
              cardsFlatlistGifyBase64AssignedGetFn: ${
                text
              }
            `
              .trim()
          );

          return cardsFlatlistGifyBase64AssignedGetFn(
            {
              text
            }
          );
        }

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
