'use strict';

import sbd from 'sbd';

export default (
  text
) => {

  return sbd.sentences(
    text,
    {
      abbreviations: [
        'US',
        'Sr',
        'al',
        'adj',
        'assn',
        'Ave',
        'BSc', 'MSc',
        'Cell',
        'Ch',
        'Co',
        'cc',
        'Corp',
        'Dem',
        'Dept',
        'ed',
        'eg',
        'Eq',
        'Eqs',
        'est',
        'est',
        'etc',
        'Ex',
        'ext', // + number?
        'Fig',
        'fig',
        'Figs',
        'figs',
        'i.e',
        'ie',
        'Inc',
        'inc',
        'Jan','Feb','Mar','Apr','Jun','Jul','Aug','Sep','Sept','Oct','Nov','Dec',
        'jr',
        'mi',
        'Miss', 'Mrs', 'Mr', 'Ms',
        'Mol',
        'mt',
        'mts',
        'no',
        'Nos',
        'PhD', 'MD', 'BA', 'MA', 'MM',
        'pl',
        'pop',
        'pp',
        'Prof', 'Dr',
        'pt',
        'Ref',
        'Refs',
        'Rep',
        'repr',
        'rev',
        'Sec',
        'Secs',
        'Sgt', 'Col', 'Gen', 'Rep', 'Sen','Gov', 'Lt', 'Maj', 'Capt','St',
        'Sr', 'sr', 'Jr', 'jr', 'Rev',
        'Sun','Mon','Tu','Tue','Tues','Wed','Th','Thu','Thur','Thurs','Fri','Sat',
        'trans',
        'Univ',
        'Viz',
        'Vol',
        'vs',
        'v',
      ]
    }
  );
};
