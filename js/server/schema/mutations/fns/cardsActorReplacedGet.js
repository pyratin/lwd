'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  actorsFind
} from '~/js/server/data/actor';
import {
  actorImagesFind
} from '~/js/server/data/actorImage';

const shuffledGet = (
  els
) => {

  return els.reduce(
    (
      memo,
      el
    ) => {

      return [
        ...memo,
        {
          el,
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
        {
          el
        }
      ) => {

        return (
          el
        );
      }
    );
};

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

const spoofActorOccurrenceCountGet = (
  spoofActor,
  spoofActors
) => {

  return spoofActors.reduce(
    (
      memo,
      _spoofActor
    ) => {

      if (
        _spoofActor._id.toString() ===
        spoofActor._id.toString()
      ) {

        return (
          memo + 1
        );
      }

      return (
        memo
      );
    },
    0
  );
};

const spoofActorOccurrenceCountAssignedGet = (
  spoofActor,
  spoofActorsPrevious
) => {

  const count = spoofActorOccurrenceCountGet(
    spoofActor,
    spoofActorsPrevious
  );

  return {
    ...spoofActor,
    count
  };
};

const spoofActorsSortedByOccurrenceGet = (
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
        spoofActorOccurrenceCountAssignedGet(
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
            a.count >
            b.count
          ) :

            return 1;

          case (
            b.count >
            a.count
          ) :

            return -1;
        }
      }
    )
    .map(
      (
        spoofActor
      ) => {

        delete spoofActor.count;

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

  spoofActors = shuffledGet(
    spoofActors
  );

  spoofActors = spoofActorsSortedByOccurrenceGet(
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
                  {
                    ...result,
                    actorUd: starringActor.ud
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

const cardCharactersGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card,
      cardIndex
    ) => {

      const cardCharacter = card.character;

      if (
        cardCharacter
      ) {

        return [
          ...memo,
          {
            ...cardCharacter,
            cardIndex
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const spoofActorByUdGet = (
  actorUd,
  spoofActors
) => {

  return spoofActors.find(
    (
      spoofActor
    ) => {

      return (
        spoofActor.actorUd ===
        actorUd
      );
    }
  );
};

const charactersSpoofActorsAssignedGet = (
  characters,
  spoofActors
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const characterActorUd = character?.actor.ud;

      if (
        characterActorUd
      ) {

        const spoofActor = spoofActorByUdGet(
          characterActorUd,
          spoofActors
        );

        return [
          ...memo,
          {
            ...character,
            _actor: spoofActor
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const actorImageIdsPreviousGet = (
  charactersPrevious
) => {

  return charactersPrevious.reduce(
    (
      memo,
      character
    ) => {

      const actorImageId = character?.actorImageId;

      if (
        actorImageId
      ) {

        return [
          ...memo,
          actorImageId
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const actorImageIdOccurrenceCountGet = (
  actorImageId,
  actorImageIds
) => {

  return actorImageIds.reduce(
    (
      memo,
      _actorImageId
    ) => {

      if (
        _actorImageId.toString() ===
        actorImageId.toString()
      ) {

        return (
          memo + 1
        );
      }

      return (
        memo
      );
    },
    0
  );
};

const actorImageIdOccurrenceCountAssignedGet = (
  actorImageId,
  actorImageIdsPrevious
) => {

  const count = actorImageIdOccurrenceCountGet(
    actorImageId,
    actorImageIdsPrevious
  );

  return {
    actorImageId,
    count
  };
};

const actorImageIdsSortedByOccurrenceGet = (
  actorImageIds,
  actorImageIdsPrevious
) => {

  return actorImageIds.reduce(
    (
      memo,
      actorImageId
    ) => {

      return [
        ...memo,
        actorImageIdOccurrenceCountAssignedGet(
          actorImageId,
          actorImageIdsPrevious
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
            a.count >
            b.count
          ) :

            return 1;

          case (
            b.count >
            a.count
          ) :

            return -1;
        }
      }
    )
    .map(
      (
        {
          actorImageId
        }
      ) => {

        return (
          actorImageId
        );
      }
    );
};

const charactersImageAssignedGetFn = async (
  character,
  charactersPrevious,
  db
) => {

  const actorImageIdsPrevious = actorImageIdsPreviousGet(
    charactersPrevious
  );

  let actorImageIds = await actorImagesFind(
    {
      _actorId: new ObjectID(
        character._actor._id
      )
    },
    {
      projection: {
        _id: 1
      },
      sort: {},
      skip: 0,
      limit: 0
    },
    db
  )
    .then(
      (
        actorImages
      ) => {

        return actorImages.map(
          (
            {
              _id: actorImageId
            }
          ) => {

            return (
              actorImageId.toString()
            );
          }
        );
      }
    );

  actorImageIds = shuffledGet(
    actorImageIds
  );

  actorImageIds = actorImageIdsSortedByOccurrenceGet(
    actorImageIds,
    actorImageIdsPrevious
  );
  console.log(character);
  console.log('actorImageIdsPrevious', actorImageIdsPrevious);
  console.log('actorImageIds', actorImageIds);
  console.log('----------------');

  const actorImageId = actorImageIds[
    0
  ];

  return (
    actorImageId
  );
};

const charactersImageAssignedGet = (
  characters,
  db
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

          return charactersImageAssignedGetFn(
            character,
            res,
            db
          )
            .then(
              (
                result
              ) => {

                return [
                  ...res,
                  {
                    ...character,
                    actorImageId: result
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

  let characters = cardCharactersGet(
    cards
  );

  characters = charactersSpoofActorsAssignedGet(
    characters,
    spoofActors
  );

  characters = await charactersImageAssignedGet(
    characters,
    db
  );

  //console.log(characters);
};
