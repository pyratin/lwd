'use strict';

const paragraphsGetFn = (
  segments,
  index
) => {

  return segments.filter(
    (
      segment
    ) => {

      return (
        segment[
          0
        ]
          .paragraphIndex ===
        index
      );
    }
  );
};

const paragraphsGet = (
  segments
) => {

  const paragraphCount = segments.slice(
    -1
  )[
    0
  ]
    .slice(
      -1
    )[
      0
    ]
    .paragraphIndex;

  return new Array(
    paragraphCount + 1
  )
    .fill()
    .reduce(
      (
        memo,
        _,
        index
      ) => {

        const paragraph = paragraphsGetFn(
          segments,
          index
        );

        return [
          ...memo,
          paragraph
        ];
      },
      []
    );
};

const deckSegmentsGet = (
  segments
) => {

  const paragraphs = paragraphsGet(
    segments
  );

  console.log(JSON.stringify(paragraphs, null, 2));
};

export default (
  segments,
  characters
) => {

  const deckSegments = deckSegmentsGet(
    segments
  );
};
