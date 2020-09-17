'use strict';

import spoofNamesGetFn from './spoofNamesGet';
import charactersSortedByStarringIndexGet 
  from './charactersSortedByStarringIndexGet';

const spoofNameHeroGet = (
  genre
) => {

  return [
    genre.split(
      /^spoof-/
    )[
      1
    ]
      .split(
        ''
      )
      .map(
        (
          letter,
          index
        ) => {

          if (
            !index
          ) {

            return letter.toUpperCase();
          }

          return (
            letter
          );
        }
      )
      .join(
        ''
      )
  ];
};

const spoofNamesShuffledGet = (
  spoofNames
) => {

  return spoofNames.map(
    (
      spoofName
    ) => {

      return {
        value: spoofName,
        random: Math.random() 
      };
    }
  )
    .sort(
      (
        a, b
      ) => {

        switch (
          true
        ) {

          case (
            a.random >
            b.random
          ) :

            return 1;

          case (
            b.random >
            a.random
          ) :

            return -1;
        }
      }
    )
    .map(
      (
        {
          value
        }
      ) => {

        return (
          value
        );
      }
    );
};

const dualRoleSuffixGet = (
  index
) => {

  switch (
    index
  ) {

    case (0) :

      return '';

    case (1) :

      return '-Man';

    default :

      return `
        -Man-${
          index + 1
        }
      `
        .trim();
  }
};

const spoofNamesProcessedGet = (
  _spoofNames,
  _characterGroups,
  assignType
) => {

  let spoofNames = spoofNamesShuffledGet(
    _spoofNames
  );

  if (
    assignType ===
    'single'
  ) {

    spoofNames = new Array(
      _characterGroups.length
    )
      .fill()
      .map(
        (
          _,
          index
        ) => {

          return `
            ${
              spoofNames[
                0
              ]
            }${
              dualRoleSuffixGet(
                index
              )
            }
          `
            .trim();
        }
      );
  }

  return (
    spoofNames
  );
};

const characterGroupsSpoofNameAssignedGetFn = (
  _characterGroups,
  _spoofNames,
  assignType
) => {

  const spoofNames = spoofNamesProcessedGet(
    _spoofNames,
    _characterGroups,
    assignType
  );

  const characterGroups = _characterGroups.reduce(
    (
      memo,
      characterGroup,
      characterGroupIndex
    ) => {

      return [
        ...memo,
        characterGroup.reduce(
          (
            memo,
            character
          ) => {

            return [
              ...memo,
              {
                ...character,
                text: spoofNames[
                  characterGroupIndex
                ],
                _text: character.text
              }
            ];
          },
          []
        )
      ];
    },
    []
  );

  return (
    characterGroups
  );
};

const characterGroupsSpoofNameAssignedGet = (
  _characterGroups,
  spoofNames,
  genre
) => {

  const heroGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      0
    ],
    spoofNameHeroGet(
      genre
    ),
    'single'
  );

  const heroineGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      1
    ],
    spoofNames.heroine,
    'single'
  );

  const villainGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      2
    ],
    spoofNames.villain,
    'single'
  );

  const manGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      3
    ],
    spoofNames.man,
    'multi'
  );

  const womanGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      4
    ],
    spoofNames.woman,
    'multi'
  );

  const unknownGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      5
    ],
    spoofNames.unknown,
    'multi'
  );

  const characterGroups = [
    heroGroups,
    heroineGroups,
    villainGroups,
    manGroups,
    womanGroups,
    unknownGroups
  ];

  return (
    characterGroups
  );
};

const charactersGet = (
  characterGroups
) => {

  return characterGroups.reduce(
    (
      memo,
      _characterGroups
    ) => {

      const characters = _characterGroups.reduce(
        (
          memo,
          characterGroup
        ) => {

          return [
            ...memo,
            ...characterGroup.reduce(
              (
                memo,
                character
              ) => {

                return [
                  ...memo,
                  character
                ];
              },
              []
            )
          ];
        },
        []
      );

      return [
        ...memo,
        ...characters
      ];
    },
    []
  );
};

const characterGroupsGet = (
  _characters
) => {

  return [
    'hero',
    'heroine',
    'villain',
    'man',
    'woman',
    'unknown'
  ]
    .reduce(
      (
        memo,
        role
      ) => {

        const characters = _characters.filter(
          (
            character
          ) => {

            return (
              character.role ===
              role
            );
          }
        );

        const characterSubGroups = characters.reduce(
          (
            memo,
            character
          ) => {

            const index = character.roleGroupIndex;

            return [
              ...memo.slice(
                0, index
              ),
              [
                ...memo[
                  index
                ] ||
                [],
                character
              ],
              ...memo.slice(
                index + 1
              )
            ];
          },
          []
        );

        return [
          ...memo,
          characterSubGroups
        ];
      },
      []
    );
};

export default (
  _characters,
  genre
) => {

  let characterGroups = characterGroupsGet(
    _characters
  );

  const spoofNames = spoofNamesGetFn();

  characterGroups = characterGroupsSpoofNameAssignedGet(
    characterGroups,
    spoofNames,
    genre
  );

  let characters = charactersGet(
    characterGroups
  );

  characters = charactersSortedByStarringIndexGet(
    characters
  );

  return (
    characters
  );
};
