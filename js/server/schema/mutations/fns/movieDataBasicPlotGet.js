'use strict';

import cheerio from 'cheerio';

import sentencesGet from './sentencesGet';

const sentencesGetFn = (
  paragraphs
) => {

  let sentences = paragraphs.reduce(
    (
      memo,
      paragraph,
      paragraphIndex
    ) => {

      const _sentences = sentencesGet(
        paragraph,
        100
      )
        .map(
          (
            text,
            sentenceIndex
          ) => {

            return {
              text,
              paragraphIndex,
              sentenceIndex
            };
          }
        );

      return [
        ...memo,
        ..._sentences
      ];
    },
    []
  );

  return (
    sentences
  );
};

export default (
  plotText
) => {

  if (
    !plotText
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    plotText
  );

  const plotEl = $(
    'span, sup'
  )
    .remove()
    .end();

  let paragraphs = plotEl
    .find(
      'p'
    )
    .toArray();

  if (
    !paragraphs.length
  ) {

    return (
      null
    );
  }

  paragraphs = paragraphs.reduce(
    (
      memo,
      p
    ) => {

      let paragraph = $(
        p
      )
        .text();

      return [
        ...memo ||
        [],
        paragraph
      ];
    },
    null
  );

  const sentences = sentencesGetFn(
    paragraphs
  );

  return (
    sentences
  );
};
