'use strict';

import NNPCrossMatchesGet from './NNPCrossMatchesGet';
import spoofNamesGetFn from './spoofNamesGet';

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

const charactersMatchIndexAssignedGetFn = (
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
    _NNPs,
    false
  );

  return matches?.[
    0
  ];
};

const charactersMatchIndexAssignedGet = (
  characters
) => {

  return characters.map(
    (
      character,
      index
    ) => {

      return {
        ...character,
        index
      };
    }
  )
    .reduce(
      (
        memo,
        character
      ) => {

        const match = charactersMatchIndexAssignedGetFn(
          character,
          memo
        );

        if (
          match &&
          (
            memo[
              match._NNPIndex
            ]
              .actor.text ===
            character.actor.text
          )
        ) {

          return [
            ...memo,
            {
              ...character,
              matchIndex: memo[
                match._NNPIndex
              ]
                .index
            }
          ];
        }

        return [
          ...memo,
          {
            ...character,
            matchIndex: -1
          }
        ];
      },
      []
    );
};

const charactersGroupedGetFn = (
  characters
) => {

  let characterGroups = characters.reduce(
    (
      memo,
      character
    ) => {

      const matchIndex = character.matchIndex;

      delete character.matchIndex;

      delete character.index;

      if (
        matchIndex >=
        0
      ) {

        return [
          ...memo.slice(
            0, matchIndex
          ),
          [
            ...memo[
              matchIndex
            ],
            character
          ],
          ...memo.slice(
            matchIndex + 1
          ),
          null
        ];
      }

      return [
        ...memo,
        [
          character
        ]
      ];
    },
    []
  );

  characterGroups = characterGroups.filter(
    (
      characterGroup
    ) => {

      return (
        characterGroup
      );
    }
  );

  return (
    characterGroups
  );
};

const characterGroupsSortedByCastIndexGet = (
  characterGroups
) => {

  return characterGroups.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a[0].castIndex >
          b[0].castIndex
        ) :

          return 1;

        case (
          b[0].castIndex >
          a[0].castIndex
        ) :

          return -1;
      }
    }
  );
};

const characterGroupsOrderedGet = (
  _characterGroups
) => {

  let characterGroups = 
  characterGroupsSortedByCastIndexGet(
    _characterGroups
  );

  let heroGroups = characterGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      const match = characterGroup.find(
        (
          character
        ) => {

          return (
            !character.castIndex &&
            (
              character.actor.gender ===
              'man'
            )
          );
        }
      );

      if (
        match
      ) {

        return [
          ...memo,
          characterGroup.map(
            (
              character
            ) => {

              return {
                ...character,
                role: 'hero'
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  let heroineGroups = characterGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      if (
        !memo.length &&
        (
          characterGroup[
            0
          ]
            .actor.gender ===
            'woman'
        )
      ) {

        return [
          ...memo,
          characterGroup.map(
            (
              character
            ) => {

              return {
                ...character,
                role: 'heroine'
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  const otherGroups = characterGroups.filter(
    (
      characterGroup
    ) => {

      const characterGroupCastIndex = characterGroup[
        0
      ]
        .castIndex;

      const heroineCastIndex = heroineGroups[
        0
      ]?.[
        0
      ]?.castIndex;

      return (
        (
          characterGroupCastIndex !==
          0
        ) &&
        (
          characterGroupCastIndex !==
          heroineCastIndex
        )
      );
    }
  );

  const manGroups = otherGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      const match = characterGroup.find(
        (
          character
        ) => {

          return (
            character.actor.gender ===
            'man'
          );
        }
      );

      if (
        match
      ) {

        return [
          ...memo,
          characterGroup.map(
            (
              character
            ) => {

              return {
                ...character,
                role: 'man'
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  const womanGroups = otherGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      const match = characterGroup.find(
        (
          character
        ) => {

          return (
            character.actor.gender ===
            'woman'
          );
        }
      );

      if (
        match
      ) {

        return [
          ...memo,
          characterGroup.map(
            (
              character
            ) => {

              return {
                ...character,
                role: 'woman'
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  const unknownGroups = otherGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      const match = characterGroup.find(
        (
          character
        ) => {

          return (
            character.actor.gender ===
            'unknown'
          );
        }
      );

      if (
        match
      ) {

        return [
          ...memo,
          characterGroup.map(
            (
              character
            ) => {

              return {
                ...character,
                role: 'unknown'
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return [
    heroGroups,
    heroineGroups,
    manGroups,
    womanGroups,
    unknownGroups
  ];
};

const charactersGroupedGet = (
  characters
) => {

  characters = charactersMatchIndexAssignedGet(
    characters
  );

  let characterGroups = charactersGroupedGetFn(
    characters
  );

  characterGroups = characterGroupsOrderedGet(
    characterGroups
  );

  return (
    characterGroups
  );
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
  spoofNames
) => {

  const heroGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      0
    ],
    spoofNames.hero,
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

  const manGroups = 
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      2
    ],
    spoofNames.man,
    'multi'
  );

  const womanGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      3
    ],
    spoofNames.woman,
    'multi'
  );

  const unknownGroups =
  characterGroupsSpoofNameAssignedGetFn(
    _characterGroups[
      4
    ],
    spoofNames.unknown,
    'multi'
  );

  const characterGroups = [
    heroGroups,
    heroineGroups,
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

export default (
  _characters,
  genre
) => {

  let characterGroups = charactersGroupedGet(
    _characters
  );

  const spoofNames = spoofNamesGetFn();

  characterGroups = characterGroupsSpoofNameAssignedGet(
    characterGroups,
    spoofNames
  );

  let characters = charactersGet(
    characterGroups
  );

  return (
    characters
  );
};
