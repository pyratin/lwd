'use strict';

import base64FilterAppliedGet from 
  './base64FilterAppliedGet';
import base64TextCompositedGet from 
  './base64TextCompositedGet';

import {
  outputResGet
} from '~/js/server/fns/variable';

const cardsFilterTypeAssignedGetFn = (
  card
) => {

  switch (
    true
  ) {

    case (
      !card?.character?.text
    ) :

      return(
        'giphy'
      );

    case (
      card.dualRoleIndex >=
      0
    ) :

      return (
        'dualRole'
      );

    default : 

      return (
        null
      );
  }
};

const cardsFilterTypeAssignedGet = (
  _cards
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      const filterType = cardsFilterTypeAssignedGetFn(
        _card
      );

      return [
        ...memo,
        {
          ..._card,
          filterType
        }
      ];
    },
    []
  );

  return (
    cards
  );
};

const cardsFilterAppliedGet = (
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

          if (
            card.filterType
          ) {

            return base64FilterAppliedGet(
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
                      base64: result
                    }
                  ];
                }
              );
          }

          return [
            ...res,
            card
          ];
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

const cardsRenderedGet = (
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

          const characterText = card?.character?.text;

          let text = card.text;

          if (
            characterText
          ) {

            text = text.replace(
              new RegExp(
                characterText
              ),
              `
                <b>${
                  characterText
                }</b>
              `
                .trim()
            );
          }

          return base64TextCompositedGet(
            card.base64,
            text,
            outputResGet(),
            20,
            10
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  result
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

  let cards = cardsFilterTypeAssignedGet(
    _cards
  );

  cards = await cardsFilterAppliedGet(
    cards
  );

  const base64s = await cardsRenderedGet(
    cards
  );

  return (
    base64s
  );
};
