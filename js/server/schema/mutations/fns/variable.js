'use strict';

const capitalizedWordsRegExpString = '((?:[A-Z]\\.\\s)*[A-Z][a-z]+(?=(?:\\s|-)[A-Z])*(?:(?:\\s|-)[A-Z][a-z]+)*)';

const capitalizedWordsRegExpForRole = new RegExp(
  `
    ${
      capitalizedWordsRegExpString
    }(\\'s)*
  `
    .trim(),
  'g'
);

const allCapsRegExp = /([A-Z]{2,})/g;

export {
  capitalizedWordsRegExpForRole,
  allCapsRegExp
};
