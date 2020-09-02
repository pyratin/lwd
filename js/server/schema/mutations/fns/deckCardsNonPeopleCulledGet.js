'use strict';

import mediawikiFetch from './mediawikiFetch';

const charactersFlatlistGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      {
        character
      }
    ) => {

      if (
        character
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

  return mediawikiFetch(
    pageCategoriesQueryGet(
      encodeURIComponent(
        characterUd
      )
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
                  result
                ) => {

                  return [
                    ...res,
                    {
                      ...character,
                      category: (
                        result
                      ) ?
                        result :
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

const charactersNonPeopleCulledGet = async (
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

const cardsNonPeopleCulledGet = (
  cards,
  characters
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const exists = characters.find(
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
        exists
      ) {

        return [
          ...memo,
          card
        ];
      }

      return [
        ...memo,
        {
          ...card,
          character: null
        }
      ];
    },
    []
  );
};

export default async (
  _cards,
  plotText
) => {

  let characters = charactersFlatlistGet(
    _cards
  );

  characters = await charactersNonPeopleCulledGet(
    characters,
    plotText
  );

  let cards = cardsNonPeopleCulledGet(
    _cards,
    characters
  );

  return (
    cards
  );
};
