'use strict';

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

      switch (
        true
      ) {

        case (
          !paragraphPreviousIndex
        ) :
        case (
          paragraphPreviousIndex ===
          paragraphCurrentIndex
        ) :
        case (
          (
            paragraphPreviousIndex ===
            paragraphCurrentIndex - 1
          ) &&
          memo.length < 5
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
    );
};
