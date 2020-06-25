'use strict';

const capitalizedWordsRegExpString = '((?:[A-Z]\\.\\s)*[A-Z][a-z]+(?=(\\s|-)[A-Z])*(?:(\\s|-)[A-Z][a-z]+)*)';

const capitalizedWordsRegExp = new RegExp(
  capitalizedWordsRegExpString,
  'g'
);

const allCapsRegExp = /([A-Z]{2,})/g;

const capitalizedWordsFromPlotSentenceGetFn = (
  sentence
) => {

  let capitalizedWords = [];

  let match;

  while (
    (
      match = capitalizedWordsRegExp.exec(
        sentence
      )
    )
  ) {

    capitalizedWords = [
      ...capitalizedWords,
      match[
        1
      ]
    ];
  }

  return (
    capitalizedWords
  );
};

const allCapsWordsGet = (
  sentence
) => {

  let allCapsWords = [];

  let match;

  while (
    (
      match = allCapsRegExp.exec(
        sentence
      )
    )
  ) {

    allCapsWords = [
      ...allCapsWords,
      match[
        1
      ]
    ];
  }

  return (
    allCapsWords
  );
};

const capitalizedWordsFromPlotSentenceGet = (
  sentence
) => {

  const capitalizedWords = capitalizedWordsFromPlotSentenceGetFn(
    sentence
  );

  const allCapsWords = allCapsWordsGet(
    sentence
  );

  return [
    ...new Set(
      [
        ...capitalizedWords,
        ...allCapsWords
      ]
    )
  ];
};

export {
  capitalizedWordsFromPlotSentenceGet
};
