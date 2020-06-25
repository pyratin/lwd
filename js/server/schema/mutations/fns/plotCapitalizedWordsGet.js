'use strict';

const _plotCapitalizedWordsGetFn = (
  sentences,
  dict
) => {
  
  return sentences.reduce(
    (
      memo,
      _sentence
    ) => {

      return [];
    },
    []
  );
};

const plotCapitalizedWordsGetFn = (
  paragraphs,
  dict
) => {

  return paragraphs.reduce(
    (
      memo,
      paragraph
    ) => {

      return [
        ...memo,
        ..._plotCapitalizedWordsGetFn(
          paragraph,
          dict
        )
      ];
    },
    []
  );
};

export default (
  plot,
  dict
) => {

  let plotCapitalizedWords = [
    ...new Set(
      plotCapitalizedWordsGetFn(
        plot,
        dict
      )
    )
  ];
};
