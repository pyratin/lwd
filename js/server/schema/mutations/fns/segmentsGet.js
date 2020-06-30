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

          const actorFragment = {
            type: 'actor',
            actor: {
              ud: character.actor.ud
            },
            ...fragment,
            text: character.text
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

      return [
        ...memo,
        ...__fragmentsGetFn(
          fragment,
          character
        )
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

export default (
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
