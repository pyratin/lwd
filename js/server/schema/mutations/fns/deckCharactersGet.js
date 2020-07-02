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
      <a href="/wiki/([^"]*)"[^>]*>${character.text}</a>
    `
      .trim(),
    'g'
  );

  const matchAll = [
    ...plotText.matchAll(
      regexp
    )
  ]
    .map(
      (
        _matchAll
      ) => {

        return (
          _matchAll[
            1
          ]
        );
      }
    );

  return (
    matchAll
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

      return [
        ...new Set(
          [
            ...memo,
            ...characterLinksGetFn(
              plotText,
              character
            )
          ]
        )
      ];
    },
    []
  );
};

const pageCategoriesQueryGet = (
  title
) => {

  return `
    https://en.wikipedia.org/w/api.php?action=query&format=json&prop=categories&cllimit=500&redirects&titles=${
      title
    }
  `;
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

  console.log(characterLinks);
};
