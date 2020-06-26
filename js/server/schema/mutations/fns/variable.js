'use strict';

const capitalizedWordsRegExpForRole = /((?:[A-Z]\.*\s*)*[A-Z]+[a-z'.]*(?=(?:\s|-)*[A-Z])*(?:(?:\s|-)*[A-Z0-9]+[a-z']*)*)/g;

const allCapsRegExp = /([A-Z]{2,})/g;

export {
  capitalizedWordsRegExpForRole,
  allCapsRegExp
};
