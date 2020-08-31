'use strict';

const rolesFlagInitializedGet = (
  roles
) => {

  return (
    roles
  ) ?
    false :
    true;
};

const rolesFlagUpdatedGet = (
  _cards,
  roles
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      if (
        (
          _card.character?.text ===
          roles?.protagonist.text
        ) ||
        (
          _card.character?.text ===
          roles?.romanticLead.text
        ) ||
        (
          _card.character?.text ===
          roles?.antagonist.text
        )
      ) {

        return [
          ...memo,
          _card
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    cards?.length ===
    roles?.length
  );
};

export default (
  _cards,
  roles
) => {

  let rolesFlag = rolesFlagInitializedGet(
    roles
  );

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      if (
        rolesFlag &&
        (
          memo.length >= 
          3
        ) &&
        (
          !memo[
            memo.length - 1
          ]?.text
            .match(/\s...,$/)
        ) &&
        (
          (
            memo[
              memo.length - 1
            ]?.paragraphIndex !==
            _card.paragraphIndex
          ) ||
          (
            memo.length >=
            6
          )
        )
      ) {

        return (
          memo
        );
      }

      rolesFlag = rolesFlagUpdatedGet(
        [
          ...memo,
          _card
        ],
        roles
      );
      console.log(rolesFlag);

      return [
        ...memo,
        _card
      ];
    },
    []
  );

  return (
    cards
  );
};
