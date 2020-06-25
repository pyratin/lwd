'use strict';

import {
  capitalizedWordsFromPlotSentenceGet
} from '../fns/common';

const sentencePrep = (
  sentence,
  dict
) => {

  const wordLead = sentence.match(
    /^(\w+)/
  )[
    1
  ];

  const wordNext = sentence.match(
    /\w+.*?(\w+)/
  )[
    1
  ];
  console.log(wordLead, wordNext);
  console.log(sentence);

  if (
    wordLead.length === 1
  ) {

    return (
      sentence
    );
  }

  const match = dict.has(
    wordLead.toLowerCase()
  );

  if (
    match
  ) {

    return [
      sentence.slice(
        0, 1
      )
        .toLowerCase(),
      ...sentence.slice(
        1
      )
    ]
      .join(
        ''
      );
  }

  return (
    sentence
  );
};

const __plotCapitalizedWordsGetFn = (
  _sentence,
  dict
) => {

  let sentence = sentencePrep(
    _sentence,
    dict
  );

  sentence = capitalizedWordsFromPlotSentenceGet(
    sentence
  );

  return (
    sentence
  );
};

const _plotCapitalizedWordsGetFn = (
  sentences,
  dict
) => {
  
  return sentences.reduce(
    (
      memo,
      sentence
    ) => {

      return [
        ...memo,
        __plotCapitalizedWordsGetFn(
          sentence,
          dict
        )
      ];
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
