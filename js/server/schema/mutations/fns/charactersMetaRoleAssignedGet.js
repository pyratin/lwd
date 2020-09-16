'use strict';

import charactersRoleVillainAssignedGet
  from './charactersRoleVillainAssignedGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

const charactersSortedByStarringCardIndexesGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.starringCardIndexes &&
          !b.starringCardIndexes
        ) :

          return -1;

        case (
          b.starringCardIndexes &&
          !a.starringCardIndexes
        ) :

          return 1;

        case (
          a.starringCardIndexes?.[
            0
          ] >
          b.starringCardIndexes?.[
            0
          ]
        ) :

          return 1;

        case (
          b.starringCardIndexes?.[
            0
          ] >
          a.starringCardIndexes?.[
            0
          ]
        ) :

          return -1;
      }
    }
  );
};

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

const charactersRoleMatchIndexAssignedGetFn = (
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

const charactersRoleMatchIndexAssignedGet = (
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

        const match = charactersRoleMatchIndexAssignedGetFn(
          character,
          memo
        );

        if (
          match &&
          (
            memo[
              match._NNPIndex
            ]
              .castIndex ===
            character.castIndex
          )
        ) {

          return [
            ...memo,
            {
              ...character,
              roleMatchIndex: memo[
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
            roleMatchIndex: -1
          }
        ];
      },
      []
    );
};

const characterGroupsGet = (
  characters
) => {

  let characterGroups = characters.reduce(
    (
      memo,
      character
    ) => {

      const roleMatchIndex = character.roleMatchIndex;

      delete character.roleMatchIndex;

      delete character.index;

      if (
        roleMatchIndex >=
        0
      ) {

        return [
          ...memo.slice(
            0, roleMatchIndex
          ),
          [
            ...memo[
              roleMatchIndex
            ],
            character
          ],
          ...memo.slice(
            roleMatchIndex + 1
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

  let villainGroups = characterGroups.reduce(
    (
      memo,
      characterGroup
    ) => {

      const match = characterGroup.find(
        (
          character
        ) => {

          return (
            character.role ===
            'villain'
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
                role: 'villain'
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

      const villainCastIndex = villainGroups[
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
        ) &&
        (
          characterGroupCastIndex !==
          villainCastIndex
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
    villainGroups,
    manGroups,
    womanGroups,
    unknownGroups
  ];
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
          characterGroup,
          roleGroupIndex
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
                  {
                    ...character,
                    roleGroupIndex
                  }
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

const charactersRoleAssignedGet = async (
  _characters,
  title
) => {

  let characters = await charactersRoleVillainAssignedGet(
    _characters,
    title
  );

  let characterGroups = characterGroupsGet(
    characters
  );

  characterGroups = characterGroupsOrderedGet(
    characterGroups
  );

  characters = charactersGet(
    characterGroups
  );

  return (
    characters
  );
};

export default async (
  _characters,
  title
) => {

  let characters = charactersSortedByStarringCardIndexesGet(
    _characters
  );

  characters = charactersRoleMatchIndexAssignedGet(
    characters
  );

  characters = await charactersRoleAssignedGet(
    characters,
    title
  );

  return (
    characters
  );
};
