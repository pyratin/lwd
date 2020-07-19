'use strict';

import nodeFetch from './nodeFetch';

const charactersUdAssignedGetFn = (
  plotText,
  character
) => {

  const regExp = new RegExp(
    `
      <a href="/wiki/([^"]*)"[^>]*>${
        character.text
      }</a>
    `
      .trim(),
    'g'
  );

  const matchAll = [
    ...plotText.matchAll(
      regExp
    )
  ]
    .reduce(
      (
        memo,
        _matchAll
      ) => {

        if (
          !memo &&
          _matchAll.length
        ) {

          return (
            _matchAll[
              1
            ]
          );
        }

        return (
          null
        );
      },
      null
    );

  return (
    matchAll
  );
};

const charactersUdAssignedGet = (
  characters,
  plotText
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
            {
              ...character,
              ud: charactersUdAssignedGetFn(
                plotText,
                character
              )
            }
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

const __charactersCategoryAssignedGetFn = (
  categoryTitle
) => {

  const peopleCategoryStrings = [
    'female',
    'male',
    'woman',
    'man',
    'character',
    'people'
  ];

  return peopleCategoryStrings.reduce(
    (
      memo,
      peopleCategoryString
    ) => {

      if (
        !memo &&
        categoryTitle.match(
          peopleCategoryString
        )
      ) {

        return (
          true
        );
      }

      return (
        memo
      );
    },
    false
  );
};

const _charactersCategoryAssignedGetFn = (
  categoryTitles
) => {

  return categoryTitles.reduce(
    (
      memo,
      categoryTitle
    ) => {

      if (
        !memo &&
        __charactersCategoryAssignedGetFn(
          categoryTitle
        )
      ) {

        return (
          'people'
        );
      }

      return (
        memo
      );
    },
    null
  );
};

const charactersCategoryAssignedGetFn = (
  characterUd
) => {

  return nodeFetch(
    pageCategoriesQueryGet(
      characterUd
    )
  )
    .then(
      (
        res
      ) => {

        const pageId = Object.keys(
          res.query.pages
        )[
          0
        ];

        const categoryTitles = res.query.pages[
          pageId
        ]
          .categories
          .map(
            (
              {
                title
              }
            ) => {

              return (
                title
              );
            }
          );

        return _charactersCategoryAssignedGetFn(
          categoryTitles
        );
      }
    );
};

const charactersCategoryAssignedGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return memo.then(
        (
          res
        ) => {

          if (
            character.ud
          ) {

            return charactersCategoryAssignedGetFn(
              character.ud
            )
              .then(
                (
                  category
                ) => {

                  return [
                    ...res,
                    {
                      ...character,
                      category: (
                        category
                      ) ?
                        category :
                        null
                    }
                  ];
                }
              );
          }

          return [
            ...res,
            character
          ];
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

const charactersFilteredGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      if (
        character.ud &&
        !character.category
      ) {

        return (
          memo
        );
      }

      return [
        ...memo,
        character
      ];
    },
    []
  )
    .map(
      (
        character
      ) => {

        delete character.ud;

        return (
          character
        );
      }
    );
};

export default async (
  _characters,
  plotText
) => {

  let characters = charactersUdAssignedGet(
    _characters,
    plotText
  );

  characters =
    await charactersCategoryAssignedGet(
      characters
    );

  characters = charactersFilteredGet(
    characters
  );

  return (
    characters
  );
};
