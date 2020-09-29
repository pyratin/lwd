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

const characterGroupsSpoofNameAssignedGetFn = (
  _characterGroups,
  _spoofNames
) => {

  const spoofNames = spoofNamesShuffledGet(
    _spoofNames
  );

  const characterGroups = _characterGroups.reduce(
    (
      memo,
      characterGroup
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
                text: (
                  spoofNames.length
                ) ?
                  spoofNames[
                    character.roleGroupIndex
                  ] :
                  character.text,
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
    )
  );

  const heroineGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      1
    ],
    spoofNames.heroine
  );

  const villainGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      2
    ],
    spoofNames.villain
  );

  const manGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      3
    ],
    spoofNames.man
  );

  const womanGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      4
    ],
    spoofNames.woman
  );

  const unknownGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      5
    ],
    spoofNames.unknown
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
