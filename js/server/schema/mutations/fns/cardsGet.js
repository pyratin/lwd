'use strict';

const charactersAssignedGetFn = (
  fragments
) => {

  return fragments.reduce(
    (
      memo,
      {
        type,
        text,
        actor
      }
    ) => {

      switch (
        true
      ) {

        case (
          type !==
          'actor'
        ) :
        case (
          !!memo.find(
            (
              _memo
            ) => {

              return (
                _memo.text ===
                text
              );
            }
          )
        ) :

          return (
            memo
          );

        default :

          return [
            ...memo,
            {
              text,
              actor: {
                text: actor.text,
                gender: actor.gender
              }
            }
          ];
      }
    },
    []
  );
};

const charactersAssignedGet = (
  segments
) => {

  return segments.reduce(
    (
      memo,
      segment
    ) => {

      return [
        ...memo,
        {
          text: segment,
          characters: charactersAssignedGetFn(
            segment
          )
        }
      ];
    },
    []
  );
};

const charactersPreviousGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      {
        character
      }
    ) => {

      if (
        character
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

const charactersWeightedGetFn = (
  character,
  charactersPrevious
) => {

  return charactersPrevious.reduce(
    (
      memo,
      _charactersPrevious,
      index
    ) => {

      if (
        _charactersPrevious.actor.text ===
        character.actor.text
      ) {

        return {
          ...memo,
          count: memo.count + 1,
          distance: charactersPrevious.length - (
            index + 1
          )
        };
      }

      return (
        memo
      );
    },
    {
      ...character,
      count: 0,
      distance: -1
    }
  );
};

const charactersWeightedGet = (
  characters,
  charactersPrevious
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...memo,
        charactersWeightedGetFn(
          character,
          charactersPrevious
        )
      ];
    },
    []
  );
};

const _characterAssignedGetFn = (
  charactersWeighted
) => {

  return charactersWeighted.sort(
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

          return 1;

        case (
          b.distance >
          a.distance
        ) :

          return -1;
      }
    }
  )[
    0
  ];
};

const characterAssignedGetFn = (
  card,
  charactersPrevious
) => {

  const charactersWeighted = charactersWeightedGet(
    card.characters,
    charactersPrevious
  );

  let character = _characterAssignedGetFn(
    charactersWeighted
  );

  character = {
    text: character.text,
    actor: character.actor
  };

  console.log('____________');
  console.log('charactersPrevious', charactersPrevious);
  console.log('charactersWeighted', charactersWeighted);
  console.log('character', character);

  return {
    text: card.text,
    character
  };
};

const characterAssignedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      _card
    ) => {

      const charactersPrevious = charactersPreviousGet(
        memo
      );

      const card = characterAssignedGetFn(
        _card,
        charactersPrevious
      );

      return [
        ...memo,
        card
      ];
    },
    []
  );
};

export default (
  segments
) => {

  let cards = charactersAssignedGet(
    segments
  );

  cards = characterAssignedGet(
    cards
  );

  return (
    cards
  );
};
