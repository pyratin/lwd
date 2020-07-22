'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  actorsFind
} from '~/js/server/data/actor';
import {
  actorImagesFind,
  actorImageFindOne
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

const spoofActorWeightGet = (
  spoofActor,
  spoofActorsPrevious
) => {

  return spoofActorsPrevious.reduce(
    (
      memo,
      _spoofActorsPrevious,
      index
    ) => {

      if (
        _spoofActorsPrevious._id.toString() ===
        spoofActor._id.toString()
      ) {

        return {
          count: memo.count + 1,
          distance: spoofActorsPrevious.length - (
            index + 1
          )
        };
      }

      return (
        memo
      );
    },
    {
      count: 0,
      distance: spoofActorsPrevious.length
    }
  );
};

const spoofActorWeightAssignedGet = (
  spoofActor,
  spoofActorsPrevious
) => {

  const weight = spoofActorWeightGet(
    spoofActor,
    spoofActorsPrevious
  );

  return {
    ...spoofActor,
    ...weight
  };
};

const spoofActorsSortedByWeightGet = (
  spoofActors,
  spoofActorsPrevious
) => {

  const spoofActorsWeightAssigned = spoofActors.reduce(
    (
      memo,
      spoofActor
    ) => {

      return [
        ...memo,
        spoofActorWeightAssignedGet(
          spoofActor,
          spoofActorsPrevious
        )
      ];
    },
    []
  );

  return spoofActorsWeightAssigned.sort(
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

        case (
          a.distance >
          b.distance
        ) :

          return -1;

        case (
          b.distance >
          a.distance
        ) :

          return 1;
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
  starringActors,
  db
) => {

  return starringActors.reduce(
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
                    actorText: starringActor.text
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

const spoofActorByTextGet = (
  actorText,
  spoofActors
) => {

  return spoofActors.find(
    (
      spoofActor
    ) => {

      return (
        spoofActor.actorText ===
        actorText
      );
    }
  );
};

const charactersActorAssignedGet = (
  characters,
  spoofActors
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const characterActorText = character.actor.text;

      if (
        characterActorText
      ) {

        const spoofActor = spoofActorByTextGet(
          characterActorText,
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

const actorImageIdWeightGet = (
  actorImageId,
  actorImageIdsPrevious
) => {

  return actorImageIdsPrevious.reduce(
    (
      memo,
      _actorImageIdsPrevious,
      index
    ) => {

      if (
        _actorImageIdsPrevious.toString() ===
        actorImageId.toString()
      ) {

        return {
          count: memo.count + 1,
          distance: actorImageIdsPrevious.length - (
            index + 1
          )
        };
      }

      return (
        memo
      );
    },
    {
      count: 0,
      distance: actorImageIdsPrevious.length
    }
  );
};

const actorImageIdWeightAssignedGet = (
  actorImageId,
  actorImageIdsPrevious
) => {

  const weight = actorImageIdWeightGet(
    actorImageId,
    actorImageIdsPrevious
  );

  return {
    actorImageId,
    ...weight
  };
};

const actorImageIdsSortedByWeightGet = (
  actorImageIds,
  actorImageIdsPrevious
) => {

  const actorImageIdsWeightAssigned = actorImageIds.reduce(
    (
      memo,
      actorImageId
    ) => {

      return [
        ...memo,
        actorImageIdWeightAssignedGet(
          actorImageId,
          actorImageIdsPrevious
        )
      ];
    },
    []
  );

  return actorImageIdsWeightAssigned.sort(
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

        case (
          a.distance >
          b.distance
        ) :

          return -1;

        case (
          b.distance >
          a.distance
        ) :

          return 1;
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

const charactersActorImageAssignedGetFn = async (
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

  actorImageIds = actorImageIdsSortedByWeightGet(
    actorImageIds,
    actorImageIdsPrevious
  );

  const actorImageId = actorImageIds[
    0
  ];

  const {
    base64
  } = await actorImageFindOne(
    {
      _id: new ObjectID(
        actorImageId
      )
    },
    null,
    db
  );

  return {
    actorImageId,
    base64
  };
};

const charactersActorImageAssignedGet = (
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

          return charactersActorImageAssignedGetFn(
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
                    ...result
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

const characterByCardIndexGet = (
  characters,
  cardIndex
) => {

  return characters.find(
    (
      character
    ) => {

      return (
        character.cardIndex ===
        cardIndex
      );
    }
  );
};

const cardsCharacterAssignedGet = (
  characters,
  cards
) => {

  return cards.reduce(
    (
      memo,
      card,
      cardIndex
    ) => {

      const character = characterByCardIndexGet(
        characters,
        cardIndex
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ...card,
            character: character.text,
            base64: character.base64,
            actorUd: character.actor.ud,
            actorId: character._actor._id
          }
        ];
      }

      return [
        ...memo,
        card
      ];
    },
    []
  );
};

export default async (
  _cards,
  db
) => {

  const starringActors = starringActorsFlatlistGet(
    _cards
  );

  const spoofActors = await spoofActorsGet(
    starringActors,
    db
  );

  let characters = cardCharactersGet(
    _cards
  );

  characters = charactersActorAssignedGet(
    characters,
    spoofActors
  );

  characters = await charactersActorImageAssignedGet(
    characters,
    db
  );

  const cards = cardsCharacterAssignedGet(
    characters,
    _cards
  ); 

  return (
    cards
  );
};
