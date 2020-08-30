'use strict';

import wordsTokenizedGet from './wordsTokenizedGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

const charactersFromCardsGetFn = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          const characterText = card?.character?.text;

          return (
            characterText &&
            (
              _memo.text ===
              characterText
            )
          );
        }
      );

      if (
        card?.character?.text &&
        !exists
      ) {

        return [
          ...memo,
          card.character
        ];
      }

      return (
        memo
      );
    },
    []
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

const charactersFromCardsGet = (
  _cards
) => {

  let characters = charactersFromCardsGetFn(
    _cards
  );

  characters = charactersSortedByCastIndexGet(
    characters
  ); 

  return (
    characters
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
    _NNPs
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

      const exists = characterExistsGet(
        character,
        memo
      );

      if (
        !exists
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

export default (
  cards
) => {

  let characters = charactersFromCardsGet(
    cards
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

  return (
    characters
  );
};
