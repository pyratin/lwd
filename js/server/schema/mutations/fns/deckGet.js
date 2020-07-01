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
      paragraph
    ) => {

      if (
        (
          memo.length < 
          5
        ) &&
        (
          paragraph.length <
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

const thumbExistsGet = (
  thumb,
  thumbs
) => {

  return thumbs.find(
    (
      _thumb
    ) => {

      return (
        _thumb.actor.ud ===
        thumb.actor.ud
      );
    }
  );
};

const deckThumbsGetFn = (
  segment
) => {

  return segment.reduce(
    (
      memo,
      fragment
    ) => {

      if (
        (
          fragment.type ===
          'actor'
        ) &&
        (
          !thumbExistsGet(
            fragment,
            memo
          )
        )
      ) {

        return [
          ...memo,
          fragment
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const deckThumbsGet = (
  segments
) => {

  return segments.reduce(
    (
      memo,
      segment
    ) => {

      return [
        ...memo,
        deckThumbsGetFn(
          segment
        )
      ];
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

  const deckThumbs = deckThumbsGet(
    deckSegments
  );

  console.log(deckThumbs);
};
