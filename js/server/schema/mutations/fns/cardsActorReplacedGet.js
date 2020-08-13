'use strict';

import {
  ObjectID
} from 'mongodb';

import {
  genreFindOne
} from '~/js/server/data/genre';
import {
  setsFind,
  setFindOne
} from '~/js/server/data/set';
import {
  actorsFind as actorsFindFn
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
        _starringActor.text ===
        starringActor.text
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
    actor :
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

const setRandomForGenreGet = (
  genre,
  db
) => {

  return genreFindOne(
    {
      text: genre
    },
    undefined,
    db
  )
    .then(
      (
        {
          _id: genreId
        }
      ) => {

        return setsFind(
          {
            _genreId: new ObjectID(
              genreId
            )
          },
          undefined,
          db
        );
      }
    )
    .then(
      (
        sets
      ) => {

        return sets[
          Math.floor(
            Math.random() *
            sets.length
          )
        ];
      }
    )
    .then(
      (
        {
          _id: setId
        }
      ) => {

        return (
          setId
        );
      }
    );
};

const spoofActorWeightAssignedGetFn = async (
  spoofActor,
  _genreId,
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

  return {
    ...spoofActor,
    count,
    distance,
    genreMatch,
    setMatch
  };
};

const spoofActorWeightAssignedGet = async (
  _spoofActors,
  genreId,
  spoofActorsPrevious,
  db
) => {

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
  genreId,
  setGeneralId,
  spoofActorsPrevious,
  db
) => {

  const gender = starringActor.gender;

  let spoofActors;

  spoofActors = await actorsFindFn(
    {
      _setId: {
        $ne: new ObjectID(
          setGeneralId
        )
      },
      gender
    },
    undefined,
    db
  );

  if (
    !spoofActors.length
  ) {

    spoofActors = await actorsFindFn(
      {
        _setId: new ObjectID(
          setGeneralId
        ),
        gender
      },
      undefined,
      db
    );
  }

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

  const setGeneralId = await setRandomForGenreGet(
    'general',
    db
  );

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
            setGeneralId,
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
    undefined,
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
            base64: character.base64,
            character: {
              text: character.text,
              actor: character.actor
            }
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
  genre,
  db
) => {

  const starringActors = starringActorsFlatlistGet(
    _cards
  );

  const spoofActors = await spoofActorsGet(
    starringActors,
    genre,
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
