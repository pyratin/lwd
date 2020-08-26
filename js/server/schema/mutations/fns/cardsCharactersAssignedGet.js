'use strict';

const __fragmentsGetFn = (
  fragment,
  character
) => {

  return fragment.text
    .split(
      character.text
    )
    .reduce(
      (
        memo,
        text
      ) => {

        return [
          ...memo,
          {
            ...fragment,
            text
          }
        ];
      },
      []
    )
    .reduce(
      (
        memo,
        fragment,
        index
      ) => {

        const textFragment = {
          type: 'text',
          ...fragment
        };

        if (
          index
        ) {

          const text = (
            character.matchIndex ===
            1
          ) ?
            character.levenMatchText :
            character.text;

          const actorFragment = {
            ...fragment,
            type: 'actor',
            actor: character.actor,
            text,
            castIndex: character.castIndex
          };

          return [
            ...memo,
            actorFragment,
            textFragment
          ];
        }

        return [
          ...memo,
          textFragment
        ];
      },
      []
    );
};

const _fragmentsGetFn = (
  fragments,
  character
) => {

  return fragments.reduce(
    (
      memo,
      fragment
    ) => {

      if (
        fragment.type !==
        'actor'
      ) {

        return [
          ...memo,
          ...__fragmentsGetFn(
            fragment,
            character
          )
        ];
      }

      return [
        ...memo,
        fragment
      ];
    },
    []
  );
};

const fragmentsGetFn = (
  sentence,
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const fragments = _fragmentsGetFn(
        memo,
        character
      )
        .reduce(
          (
            fragmentMemo,
            fragment,
            fragmentIndex
          ) => {

            return [
              ...fragmentMemo,
              {
                ...fragment,
                fragmentIndex
              }
            ];
          },
          []
        );

      return (
        fragments
      );
    },
    [
      sentence
    ]
  );
};

const fragmentsGet = (
  plot,
  characters
) => {

  return plot.reduce(
    (
      memo,
      sentence,
      segmentIndex
    ) => {

      const fragments = fragmentsGetFn(
        sentence,
        characters
      )
        .reduce(
          (
            memo,
            fragment
          ) => {

            return [
              ...memo,
              {
                ...fragment,
                segmentIndex
              }
            ];
          },
          []
        );

      return [
        ...memo,
        ...fragments
      ];
    },
    []
  );
};

const segmentsGetFn = (
  fragments
) => {

  const segmentCount = fragments.slice(
    -1
  )[
    0
  ]
    .segmentIndex;

  return new Array(
    segmentCount + 1
  )
    .fill()
    .reduce(
      (
        memo,
        _,
        index
      ) => {

        return [
          ...memo,
          fragments.filter(
            (
              fragment
            ) => {

              return (
                fragment.segmentIndex ===
                index
              );
            }
          )
        ];
      },
      []
    );
};

const segmentsGet = (
  plot,
  characters
) => {

  const fragments = fragmentsGet(
    plot,
    characters
  );

  const segments = segmentsGetFn(
    fragments
  );

  return (
    segments
  );
};

const charactersAssignedGetFn = (
  fragments
) => {

  return fragments.reduce(
    (
      memo,
      {
        type,
        text,
        actor,
        castIndex
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
                ud: actor.ud,
                text: actor.text,
                gender: actor.gender,
              },
              castIndex
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

const cardsTextCollapsedGetFn = (
  card
) => {

  const {
    text
  } = card.text.reduce(
    (
      memo,
      fragment
    ) => {

      return {
        text: `${memo.text}${fragment.text}`
      };
    },
    {
      text: ''
    }
  );

  return {
    ...card,
    text
  };
};

const cardsTextCollapsedGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      return [
        ...memo,
        {
          ...cardsTextCollapsedGetFn(
            card
          )
        }
      ];
    },
    []
  );
};

export default (
  plot,
  characters
) => {

  const segments = segmentsGet(
    plot,
    characters
  );

  let cards = charactersAssignedGet(
    segments
  );

  cards = cardsTextCollapsedGet(
    cards
  );

  return (
    cards
  );
};
