'use strict';

const capitalizedWordsRegExpString = '((?:[A-Z]\\.\\s)*[A-Z][a-z]+(?=(\\s|-)[A-Z])*(?:(\\s|-)[A-Z][a-z]+)*)';

const capitalizedWordsRegExp = new RegExp(
  capitalizedWordsRegExpString,
  'g'
);

const allCapsRegExp = /([A-Z]{2,})/g;

export {

};
