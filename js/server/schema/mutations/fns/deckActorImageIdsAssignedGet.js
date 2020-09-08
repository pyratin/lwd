'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  genreFindOne
} from '~/js/server/data/genre';
import {
  setFindOne
} from '~/js/server/data/set';
import {
  actorsFind as actorsFindFn
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

const starringActorsFlatlistGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            character.actor.text
          );
        }
      );

      if (
        character.starringCardIndexes &&
        !exists
      ) {

        return [
          ...memo,
          character.actor
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const spoofActorWeightAssignedGetFn = async (
  spoofActor,
  _genreId,
  genreGeneralId,
  spoofActorsPrevious,
  db
) => {

  const {
    count,
    distance
  } = spoofActorsPrevious.reduce(
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

  const genreId = (
    await setFindOne(
      {
        _id: new ObjectID(
          spoofActor._setId
        )
      },
      undefined,
      db
    )
  )?._genreId;

  const genreMatch = (
    _genreId?.toString() ===
    genreId?.toString()
  );

  const spoofActorPrevious = spoofActorsPrevious[
    spoofActorsPrevious.length - 1
  ];

  const _setId = (
    spoofActorPrevious
  ) ?
    spoofActorPrevious._setId :
    null;

  const setMatch = (
    _setId?.toString() ===
    spoofActor._setId
      .toString()
  );

  const genreGeneralMatch = (
    genreGeneralId?.toString() ===
    genreId?.toString()
  );

  return {
    ...spoofActor,
    count,
    distance,
    genreMatch,
    setMatch,
    genreGeneralMatch
  };
};

const spoofActorWeightAssignedGet = async (
  _spoofActors,
  genreId,
  spoofActorsPrevious,
  db
) => {

  const {
    _id: genreGeneralId
  } = await genreFindOne(
    {
      text: 'general'
    },
    undefined,
    db
  );

  const spoofActors = await _spoofActors.reduce(
    (
      memo,
      _spoofActor
    ) => {

      return memo.then(
        (
          result
        ) => {

          return spoofActorWeightAssignedGetFn(
            _spoofActor,
            genreId,
            genreGeneralId,
            spoofActorsPrevious,
            db
          )
            .then(
              (
                res
              ) => {

                return [
                  ...result,
                  res
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

  return (
    spoofActors
  );
};

const spoofActorsSortedGet = (
  spoofActors
) => {

  return spoofActors.sort(
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

        case (
          a.genreMatch &&
          !b.genreMatch
        ) :

          return -1;

        case (
          b.genreMatch &&
          !a.genreMatch
        ) :

          return 1;

        case (
          a.setMatch &&
          !b.setMatch
        ) :

          return -1;

        case (
          b.setMatch &&
          !a.setMatch
        ) :

          return 1;

        case (
          a.genreGeneralMatch &&
          !b.genreGeneralMatch
        ) :

          return -1;

        case (
          b.genreGeneralMatch &&
          !a.genreGeneralMatch
        ) :

          return 1;
      }
    }
  );
};

const spoofActorsGetFn = async (
  starringActor,
  genreId,
  spoofActorsPrevious,
  db
) => {

  const gender = starringActor.gender;

  let spoofActors = await actorsFindFn(
    {
      gender
    },
    undefined,
    db
  );

  spoofActors = shuffledGet(
    spoofActors
  );

  spoofActors = await spoofActorWeightAssignedGet(
    spoofActors,
    genreId,
    spoofActorsPrevious,
    db
  );

  spoofActors = spoofActorsSortedGet(
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

const spoofActorsGet = async (
  starringActors,
  genre,
  db
) => {

  const genreId = (
    await genreFindOne(
      {
        text: genre
      },
      undefined,
      db
    )
  )?._id;

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
            genreId,
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

      if (
        character.starringCardIndexes
      ) {

        const spoofActor = spoofActorByTextGet(
          character.actor.text,
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

      return [
        ...memo,
        character
      ];
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

const charactersActorImageIdAssignedGetFn = async (
  character,
  charactersPrevious,
  db
) => {

  if (
    !character.starringCardIndexes
  ) {

    return Promise.resolve(
      null
    );
  }

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

  return (
    actorImageId
  );
};

const charactersActorImageIdAssignedGet = (
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

          return charactersActorImageIdAssignedGetFn(
            character,
            res,
            db
          )
            .then(
              (
                result
              ) => {

                if (
                  result
                ) {

                  delete character._actor;

                  return [
                    ...res,
                    {
                      ...character,
                      actorImageId: result
                    }
                  ];
                }

                return [
                  ...res,
                  character
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

const cardsCharacterAssignedGet = (
  characters,
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const character = characters.find(
        (
          character
        ) => {

          return (
            character.text ===
            card.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ...card,
            actorImageId: character.actorImageId
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
  deck,
  genre,
  db
) => {

  let starringActors = starringActorsFlatlistGet(
    deck.splash.characters
  );

  const spoofActors = await spoofActorsGet(
    starringActors,
    genre,
    db
  );

  let characters = charactersActorAssignedGet(
    deck.splash.characters,
    spoofActors
  );

  characters = await charactersActorImageIdAssignedGet(
    characters,
    db
  );

  const cards = cardsCharacterAssignedGet(
    characters,
    deck.cards
  ); 

  return {
    ...deck,
    cards,
    splash: {
      ...deck.splash,
      characters
    }
  };
};
