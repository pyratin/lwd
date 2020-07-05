'use strict';

import nodeFetch from './nodeFetch';

const characterLinksGetFn = (
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

const __characterLinksCategoryAssignedGetFn = (
  title
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
        title.match(
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

const _characterLinksCategoryAssignedGetFn = (
  titles
) => {

  return titles.reduce(
    (
      memo,
      title
    ) => {

      if (
        !memo &&
        __characterLinksCategoryAssignedGetFn(
          title
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

const characterLinksCategoryAssignedGetFn = (
  characterLink
) => {

  return nodeFetch(
    pageCategoriesQueryGet(
      characterLink
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

        const titles = res.query.pages[
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

        return _characterLinksCategoryAssignedGetFn(
          titles
        );
      }
    );
};

const characterLinksCategoryAssignedGet = (
  characterLinks
) => {

  return characterLinks.reduce(
    (
      memo,
      characterLink
    ) => {

      return memo.then(
        (
          res
        ) => {

          return characterLinksCategoryAssignedGetFn(
            characterLink
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  {
                    ud: characterLink,
                    category: (
                      result
                    ) ?
                      'people' :
                      'other'
                  }
                ];
              }
            );
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

export default async (
  characters,
  plotText
) => {

  const characterLinks = characterLinksGet(
    plotText,
    characters
  );

  const characterLinksCategoryAssigned =
    await characterLinksCategoryAssignedGet(
      characterLinks
    );

  console.log(characterLinksCategoryAssigned);
};
