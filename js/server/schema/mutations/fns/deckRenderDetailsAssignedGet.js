'use strict';

import wordsTokenizedGet from './wordsTokenizedGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

const charactersSortedByStarringCardIndexesGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.starringCardIndexes &&
          !b.starringCardIndexes
        ) :

          return -1;

        case (
          b.starringCardIndexes &&
          !a.starringCardIndexes
        ) :

          return 1;

        case (
          a.starringCardIndexes?.[
            0
          ] >
          b.starringCardIndexes?.[
            0
          ]
        ) :

          return 1;

        case (
          b.starringCardIndexes?.[
            0
          ] >
          a.starringCardIndexes?.[
            0
          ]
        ) :

          return -1;
      }
    }
  );
};

const _NNPsGet = (
  characters
) => {

  return characters.map(
    (
      {
        text
      },
      index
    ) => {

      return {
        text,
        index
      };
    }
  );
};

const characterExistsGet = (
  character,
  characters
) => {

  const NNP = {
    text: character.text,
    index: 0
  };

  const _NNPs = _NNPsGet(
    characters
  );

  const matches = NNPCrossMatchesGet(
    NNP,
    _NNPs,
    false
  );

  return matches?.[
    0
  ];
};

const charactersDualRoleIndexAssignedGet = (
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

      const match = characterExistsGet(
        _character,
        memo
      );

      if (
        match
      ) {

        return [
          ...memo,
          {
            ..._character,
            dualRoleIndex: memo[
              match._NNPIndex
            ]
              .dualRoleIndex
          }
        ];
      }

      const dualRoleIndex = memo.findIndex(
        (
          _memo
        ) => {

          return (
            (
              _memo.dualRoleIndex === 
              -1
            ) &&
            (
              _memo.actor.text ===
              _character.actor.text
            )
          );
        }
      );

      if (
        dualRoleIndex >=
        0
      ) {

        return [
          ...memo,
          {
            ..._character,
            dualRoleIndex
          }
        ];
      }

      return [
        ...memo,
        {
          ..._character,
          dualRoleIndex: -1
        }
      ];
    },
    []
  );

  return (
    characters
  );
};

const charactersRenderTextAssignedGetFn = (
  _text,
  lengthMax
) => {

  const tokens = wordsTokenizedGet(
    _text
  )
    .map(
      (
        {
          text
        }
      ) => {

        return (
          text
        );
      }
    );

  let text = tokens.reduce(
    (
      memo,
      token
    ) => {

      if (
        memo.length < 
        lengthMax
      ) {

        return `
          ${
            memo
          } ${
            token
          }
        `
          .trim();
      }

      return (
        memo
      );
    },
    ''
  );

  text = text.slice(
    0, lengthMax
  );

  if (
    text.length <
    _text.length
  ) {

    text = `
      ${
        text
      }..
    `
      .trim();
  }

  return (
    text
  );
};

const charactersRenderTextAssignedGet = (
  characters
) => {

  const lengthMax = 10;

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const renderText = charactersRenderTextAssignedGetFn(
        character.text,
        lengthMax
      );

      return [
        ...memo,
        {
          ...character,
          renderText
        }
      ];
    },
    []
  );

};

const charactersRenderAssignedGet = (
  characters 
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const match = characterExistsGet(
        character,
        memo
      );

      if (
        character.starringCardIndexes &&
        (
          !match ||
          (
            memo[
              match._NNPIndex
            ]
              .actor.text !==
            character.actor.text
          )
        )
      ) {
        
        return [
          ...memo,
          {
            ...character,
            render: true
          }
        ];
      }

      return [
        ...memo,
        {
          ...character,
          render: false
        }
      ];
    },
    []
  );
};

const charactersConcatedGet = (
  _characters
) => {

  let characters = _characters.reduce(
    (
      memo,
      character
    ) => {

      const dualRoleIndex = character.dualRoleIndex;

      if (
        character.render &&
        (
          dualRoleIndex >=
          0
        )
      ) {

        const renderText = `
          ${
            memo[
              dualRoleIndex
            ]
              .renderText
          } / ${
            character.renderText
          }
        `
          .trim();

        return [
          ...memo.slice(
            0, dualRoleIndex
          ),
          {
            ...memo[
              dualRoleIndex
            ],
            renderText
          },
          ...memo.slice(
            dualRoleIndex + 1
          ),
          {
            ...character,
            render: false
          }
        ];
      }

      return [
        ...memo,
        character,
      ];
    },
    []
  );

  return (
    characters
  );
};

const charactersSortedByCastIndexGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.castIndex >
          b.castIndex
        ) :

          return 1;

        case (
          b.castIndex >
          a.castIndex
        ) :

          return -1;
      }
    }
  );
};

const charactersRenderDetailAssignedGet = (
  _characters
) => {

  let characters = charactersSortedByStarringCardIndexesGet(
    _characters
  );

  characters = charactersDualRoleIndexAssignedGet(
    characters
  );

  characters = charactersRenderTextAssignedGet(
    characters
  );

  characters = charactersRenderAssignedGet(
    characters
  );

  characters = charactersConcatedGet(
    characters
  );

  characters = charactersSortedByCastIndexGet(
    characters
  );

  return (
    characters
  );
};

const cardsRenderDetailAssignedGet = (
  cards,
  characters
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const character = characters.find(
        (
          character
        ) => {

          return (
            character.text ===
            card.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ...card,
            dualRoleIndex: character.dualRoleIndex
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

const cardTextGet = (
  {
    text: _text,
    character
  }
) => {

  let renderText = _text;

  if (
    !character
  ) {

    return (
      renderText
    );
  }

  renderText = `
    ${
      renderText.slice(
        0, character.distance
      )
    }<b>${
      character.text
    }</b>${
      renderText.slice(
        character.distance +
        character.text.length
      )
    }
  `
    .trim();

  return (
    renderText
  );
};

const cardGet = (
  card
) => {

  const renderText = cardTextGet(
    card
  );

  return {
    ...card,
    renderText
  };
};

const cardsRenderTextAssignedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      _card
    ) => {

      const card = cardGet(
        _card
      );

      return [
        ...memo,
        card
      ];
    },
    []
  );
};

export default (
  deck
) => {

  let characters = charactersRenderDetailAssignedGet(
    deck.splash.characters
  );

  let cards = cardsRenderDetailAssignedGet(
    deck.cards,
    characters
  );

  cards = cardsRenderTextAssignedGet(
    cards
  );

  return {
    ...deck,
    cards,
    splash: {
      ...deck.splash,
      characters
    }
  };
};
