'use strict';

import {
  actorsFind
} from '~/js/server/data/actor';

const starringActorExistsGet = (
  starringActor,
  starringActors
) => {

  return starringActors.find(
    (
      _starringActor
    ) => {

      return (
        _starringActor.ud ===
        starringActor.ud
      );
    }
  );
};

const spoofActorExistsGet = (
  spoofActor,
  spoofActors
) => {

  return spoofActors.find(
    (
      _spoofActor
    ) => {

      return (
        _spoofActor._id.toString() ===
        spoofActor._id.toString()
      );
    }
  );
};

const starringActorsFlatlistGetFn = (
  card
) => {

  const actor = card.character?.actor;

  return (
    actor
  ) ?
    {
      ...card.character?.actor,
    } :
    null;
};

const starringActorsFlatlistGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const starringActor = starringActorsFlatlistGetFn(
        card
      );

      if (
        starringActor &&
        !starringActorExistsGet(
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

const spoofActorsShuffledGet = (
  spoofActors
) => {

  return spoofActors.reduce(
    (
      memo,
      spoofActor
    ) => {

      return [
        ...memo,
        {
          ...spoofActor,
          random: Math.random()
        }
      ];
    },
    []
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
        spoofActor
      ) => {

        delete spoofActor.random;

        return (
          spoofActor
        );
      }
    );
};

const spoofActorsSortedByWeightGetFn = (
  spoofActor,
  spoofActorsPrevious
) => {

  const exists = !!spoofActorExistsGet(
    spoofActor,
    spoofActorsPrevious
  );

  return {
    ...spoofActor,
    exists
  };
};

const spoofActorsSortedByWeightGet = (
  spoofActors,
  spoofActorsPrevious
) => {

  return spoofActors.reduce(
    (
      memo,
      spoofActor
    ) => {

      return [
        ...memo,
        spoofActorsSortedByWeightGetFn(
          spoofActor,
          spoofActorsPrevious
        )
      ];
    },
    []
  )
    .sort(
      (
        a, b
      ) => {

        switch (
          true
        ) {

          case (
            a.exists &&
            !b.exists
          ) :

            return 1;

          case (
            b.exists &&
            !a.exists
          ) :

            return -1;
        }
      }
    )
    .map(
      (
        spoofActor
      ) => {

        delete spoofActor.exists;

        return (
          spoofActor
        );
      }
    );
};

const spoofActorsGetFn = async (
  starringActor,
  spoofActorsPrevious,
  db
) => {

  let spoofActors = await actorsFind(
    {
      gender: starringActor.gender
    },
    null,
    db
  );

  spoofActors = spoofActorsShuffledGet(
    spoofActors
  );

  spoofActors = spoofActorsSortedByWeightGet(
    spoofActors,
    spoofActorsPrevious
  );

  const spoofActor = spoofActors[
    0
  ];

  return (
    spoofActor
  );
};

const spoofActorsGet = (
  starringActor,
  db
) => {

  return starringActor.reduce(
    (
      memo,
      starringActor
    ) => {

      return memo.then(
        (
          res
        ) => {

          return spoofActorsGetFn(
            starringActor,
            res,
            db
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  result
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
  cards,
  db
) => {

  const starringActorsFlatlist = starringActorsFlatlistGet(
    cards
  );

  const spoofActors = await spoofActorsGet(
    starringActorsFlatlist,
    db
  );

  console.log(spoofActors);
};
