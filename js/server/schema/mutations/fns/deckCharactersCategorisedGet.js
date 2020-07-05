'use strict';

import nodeFetch from './nodeFetch';

const charactersUdAssignedGetFn = (
  plotText,
  character
) => {

  const regExp = new RegExp(
    `
      <a href="/wiki/([^"]*)"[^>]*>${character.text}</a>
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

const __charactersCategorisedGetFn = (
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

const _charactersCategorisedGetFn = (
  categoryTitles
) => {

  return categoryTitles.reduce(
    (
      memo,
      categoryTitle
    ) => {

      if (
        !memo &&
        __charactersCategorisedGetFn(
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

const charactersCategorisedGetFn = (
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

        return _charactersCategorisedGetFn(
          categoryTitles
        );
      }
    );
};

const charactersCategorisedGet = (
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

            return charactersCategorisedGetFn(
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
                      category
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

export default async (
  _characters,
  plotText
) => {

  let characters = charactersUdAssignedGet(
    _characters,
    plotText
  );

  characters =
    await charactersCategorisedGet(
      characters
    );

  return (
    characters
  );
};
