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

  return paragraphs.reduce(
    (
      memo,
      paragraph,
      paragraphIndex
    ) => {

      const paragraphLastIndex = (
        memo.length
      ) ?
        memo.slice(
          -1
        )[
          0
        ][
          0
        ]
          .paragraphIndex:
        0;

      if (
        !paragraphIndex ||
        (
          (
            (
              paragraphLastIndex + 
              1 
            ) ===
            paragraphIndex 
          ) &&
          (
            memo.length +
            paragraph.length
          ) <
          5
        )
      ) {

        return [
          ...memo,
          ...paragraph
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
  segments
) => {

  const deckSegments = deckSegmentsGet(
    segments
  );

  console.log(deckSegments);

  return (
    deckSegments
  );
};
