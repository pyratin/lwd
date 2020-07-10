'use strict';

const actorExistsGet = (
  actor,
  actors
) => {

  return (false);
};

const starringActorsFlatlistGetFn = (
  card,
  cardIndex
) => {

  const actor = card.character?.actor;

  return (
    actor
  ) ?
    {
      ...card.character?.actor,
      cardIndex
    } :
    null;
};

const starringActorsFlatlistGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card,
      cardIndex
    ) => {

      const starringActor = starringActorsFlatlistGetFn(
        card,
        cardIndex
      );

      if (
        starringActor &&
        !actorExistsGet(
          starringActor,
          memo
        )
      ) {

        return [
          ...memo,
          starringActor
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
  cards
) => {

  const starringActorsFlatlist = starringActorsFlatlistGet(
    cards
  );

  console.log(starringActorsFlatlist);
};
