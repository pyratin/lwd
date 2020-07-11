'use strict';

const cardTextFragmentsCollapsedGet = (
  card
) => {

  const text = card.text.reduce(
    (
      memo,
      fragment
    ) => {

      return `${memo}${fragment.text}`;
    },
    ''
  );

  return {
    ...card,
    text
  };
};

export default (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const paragraphPreviousIndex = (
        memo.length
      ) &&
        memo[
          memo.length - 1
        ]
          .text[
            0
          ]
          .paragraphIndex;

      const paragraphCurrentIndex = card.text[
        0
      ]
        .paragraphIndex;

      const paragraphCurrentLength = cards.filter(
        (
          card
        ) => {

          return (
            (
              card.text[
                0
              ]
                .paragraphIndex
            ) ===
            paragraphCurrentIndex
          );
        }
      )
        .length;

      switch (
        true
      ) {

        case (
          !paragraphCurrentIndex
        ) :
        case (
          paragraphCurrentIndex ===
          paragraphPreviousIndex
        ) :
        case (
          (
            paragraphCurrentIndex ===
            paragraphPreviousIndex + 1
          ) &&
          (
            (
              memo.length +
              paragraphCurrentLength
            ) < 5
          )
        ) :

          return [
            ...memo,
            card
          ];

        default :

          return (
            memo
          );
      }
    },
    []
  )
    .reduce(
      (
        cardMemo,
        card
      ) => {

        return [
          ...cardMemo,
          {
            ...card,
            text: card.text
              .reduce(
                (
                  fragmentMemo,
                  {
                    type,
                    text
                  }
                ) => {

                  return [
                    ...fragmentMemo,
                    {
                      type,
                      text
                    }
                  ];
                },
                []
              )
          }
        ];
      },
      []
    )
    .reduce(
      (
        memo,
        card
      ) => {

        return [
          ...memo,
          cardTextFragmentsCollapsedGet(
            card
          )
        ];
      },
      []
    );
};
