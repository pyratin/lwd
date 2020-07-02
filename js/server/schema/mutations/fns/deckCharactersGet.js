'use strict';

const charactersGetFn = (
  fragments
) => {

  return fragments.reduce(
    (
      memo,
      fragment
    ) => {

      if (
        fragment.type ===
        'actor'
      ) {

        return [
          ...memo,
          fragment
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const characterExistsGet = (
  characters,
  character
) => {

  const characterExists = characters.find(
    (
      _character
    ) => {

      return (
        _character.text ===
        character.text
      );
    }
  );

  return (
    !!characterExists
  );
};

const charactersGet = (
  deckSegments
) => {

  return deckSegments.reduce(
    (
      memo,
      segment
    ) => {

      return [
        ...memo,
        ...charactersGetFn(
          segment
        )
      ];
    },
    []
  )
    .reduce(
      (
        memo,
        character
      ) => {

        if (
          !characterExistsGet(
            memo,
            character
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

const characterLinksGetFn = (
  plotText,
  character
) => {

  const regexp = new RegExp(
    `
      (<a.*?>${
        character.text
      }</a>)
    `
      .trim(),
    'g'
  );

  const match = plotText.matchAll(
    regexp
  );
  console.log([...match], '---------');

  return (
    match
  );
};

const characterLinksGet = (
  plotText,
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const characterLinks = characterLinksGetFn(
        plotText,
        character
      );

      if (
        characterLinks
      ) {

        return [
          ...memo,
          characterLinks
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

export default (
  deckSegments,
  plotText
) => {

  const characters = charactersGet(
    deckSegments
  );

  const characterLinks = characterLinksGet(
    plotText,
    characters
  );

  //console.log(characterLinks);
};
