'use strict';

const cardsGetFn = (
  fragments
) => {

  return fragments.reduce(
    (
      memo,
      {
        type,
        text,
        actor
      }
    ) => {

      switch (
        true
      ) {

        case (
          type !==
          'actor'
        ) :
        case (
          !!memo.find(
            (
              _memo
            ) => {

              return (
                _memo.text ===
                text
              );
            }
          )
        ) :

          return (
            memo
          );

        default :

          return [
            ...memo,
            {
              text,
              actor: {
                text: actor.text,
                gender: actor.gender
              }
            }
          ];
      }
    },
    []
  );
};

const cardsGet = (
  segments
) => {

  return segments.reduce(
    (
      memo,
      segment
    ) => {

      return [
        ...memo,
        {
          text: segment,
          characters: cardsGetFn(
            segment
          )
        }
      ];
    },
    []
  );
};

export default (
  segments
) => {

  let cards = cardsGet(
    segments
  );

  return (
    cards
  );
};
