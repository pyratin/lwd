'use strict';

const rolesFlagInitializedGet = (
  roles,
  deckLimitByRolesFlag
) => {

  return (
    roles &&
    (
      Object.keys(
        roles
      )
        .length
    ) &&
    deckLimitByRolesFlag
  ) ?
    false :
    true;
};

const rolesFlagUpdatedGet = (
  card,
  cards,
  roles,
  rolesFlag
) => {

  if (
    rolesFlag
  ) {

    return (
      rolesFlag
    );
  }

  const matches = Object.keys(
    roles
  )
    .reduce(
      (
        memo,
        roleKey
      ) => {

        const match = [
          ...cards,
          card
        ].find(
          (
            card
          ) => {

            return (
              card.character?.text ===
              roles[
                roleKey
              ]
                .text
            );
          }
        );

        if (
          match
        ) {

          return [
            ...memo,
            roles[
              roleKey
            ]
          ];
        }

        return (
          memo
        );
      },
      []
    );

  return (
    Object.keys(
      roles
    )
      .length ===
    matches.length
  );
};

const textTerminatedGet = (
  memo
) => {

  return (
    !memo[
      memo.length - 1
    ]
      .text.match(
        /\s...,$/
      )
  );
};

const cardsCulledByLimitGet = (
  _cards,
  roles,
  deckHardLimit,
  deckLimitByRolesFlag
) => {

  let rolesFlag = rolesFlagInitializedGet(
    roles,
    deckLimitByRolesFlag
  );

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      rolesFlag = rolesFlagUpdatedGet(
        _card,
        memo,
        roles,
        rolesFlag
      );

      switch (
        true
      ) {

        case (
          !!deckHardLimit &&
          (
            memo.length >=
            deckHardLimit
          ) &&
          textTerminatedGet(
            memo
          )
        ) :
        case (
          !!deckLimitByRolesFlag &&
          !!rolesFlag &&
          textTerminatedGet(
            memo
          )
        ) :

          return (
            memo
          );

        default :

          return [
            ...memo,
            _card
          ];
      }
    },
    []
  );

  return (
    cards
  );
};

const charactersCulledGet = (
  characters,
  cards
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = cards.find(
        (
          card
        ) => {

          return (
            card.character?.text ===
            character.text
          );
        }
      );

      if (
        exists
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

export default (
  _cards,
  roles,
  deckHardLimit,
  deckLimitByRolesFlag,
  _characters
) => {

  const cards = cardsCulledByLimitGet(
    _cards,
    roles,
    deckHardLimit,
    deckLimitByRolesFlag
  );

  const characters = charactersCulledGet(
    _characters,
    cards
  );

  return {
    cards, 
    splash: {
      characters
    }
  };
};
