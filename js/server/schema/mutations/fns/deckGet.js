'use strict';

import cardsActorReplacedGet from './cardsActorReplacedGet';
import cardsGifyAssignedGet from './cardsGifyAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';

const deckGet = (
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
    .slice(
      0, 5
    );
};

const characterExistsGet = (
  character, 
  characters
) => {

  return characters.find(
    (
      _character
    ) => {

      return (
        _character.text ===
        character.text
      );
    }
  );
};

const charactersFlatlistGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const character = card.character;

      if (
        character &&
        !characterExistsGet(
          character,
          memo
        )
      ) {

        return [
          ...memo,
          character
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

export default async (
  _cards,
  db
) => {

  let cards = deckGet(
    _cards
  );

  let characters = charactersFlatlistGet(
    cards
  );

  characters = await charactersActorGenderAssignedGet(
    characters
  );
  console.log(characters);

  //cards = await cardsActorReplacedGet(
    //cards,
    //db
  //);

  //cards = await cardsGifyAssignedGet(
    //cards
  //);

  return (
    cards
  );
};
