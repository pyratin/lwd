'use strict';

import charactersFromCardsGet 
  from './charactersFromCardsGet';
import wordsTokenizedGet from './wordsTokenizedGet';

const charactersDualRoleIndexAssignedGet = (
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

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

const characterTextShortenedGet = (
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

const charactersRenderAssignedGet = (
  _characters
) => {

  const lengthMax = 10;

  let characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

      const renderText = characterTextShortenedGet(
        _character.text,
        lengthMax
      );

      return [
        ...memo,
        {
          ..._character,
          renderText
        }
      ];
    },
    []
  );

  characters = characters.reduce(
    (
      memo,
      character
    ) => {

      const dualRoleIndex = character.dualRoleIndex;

      if (
        dualRoleIndex >=
        0
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
        {
          ...character,
          render: true
        }
      ];
    },
    []
  );

  return (
    characters
  );
};

export default (
  title,
  poster,
  cards
) => {

  let characters = charactersFromCardsGet(
    cards
  );

  characters = charactersDualRoleIndexAssignedGet(
    characters
  );
  console.log(characters);

  characters = charactersRenderAssignedGet(
    characters
  );

  return {
    title,
    poster,
    characters
  };
};
