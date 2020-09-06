'use strict';

import moment from 'moment';

import mediawikiFetch from './mediawikiFetch';
import movieDataBasicGet from './movieDataBasicGet';

const categoryGet = (
  _category
) => {

  switch (
    _category
  ) {

    case (
      'tamil'
    ) :

      return 'tamil-language_films';

    case (
      'hindi'
    ) :

      return 'hindi-language_films';

    default :

      return 'English-language_films';
  }
};

const queryGet = (
  cmstart,
  cmend,
  category
) => {

  return `
    https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&format=json&cmlimit=500&cmsort=timestamp&cmstart=${
      cmstart
    }&cmend=${
      cmend
    }&cmtitle=Category:${
      category
    }
  `
    .trim();
};

const movieTitleRandomGetFn = async (
  res
) => {

  const categorymembers = res.query.categorymembers;

  const title = categorymembers[
    Math.floor(
      Math.random() *
      categorymembers.length
    )
  ]?.title;

  if (
    !title
  ) {

    return (
      null
    );
  }

  const movieDataBasic = await movieDataBasicGet(
    title,
    5
  );

  if (
    !movieDataBasic?.plot ||
    !movieDataBasic?.cast
  ) {

    return (
      null
    );
  }

  return (
    title
  );
};

const movieTitleRandomGet = (
  _category
) => {

  const year = 2000 +
  (
    Math.floor(
      Math.random() *
      (
        moment()
          .year() -
        2000
      )
    )
  );

  const month = 1 +
  (
    Math.floor(
      Math.random() *
      12
    )
  );

  const dateString = `
    ${
      year
    }-${
      month
    }-01
  `
    .trim();

  const cmstart = moment(
    new Date(
      dateString
    )
  )
    .toISOString();

  const cmend = moment(
    cmstart
  )
    .add(
      1, 'year'
    )
    .toISOString();

  const category = categoryGet(
    _category
  );

  const query = queryGet(
    cmstart,
    cmend,
    category
  );

  return mediawikiFetch(
    query
  )
    .then(
      async (
        res
      ) => {

        const title = await movieTitleRandomGetFn(
          res
        );

        if (
          !title
        ) {

          // eslint-disable-next-line
          console.log(
            `
              movieTitleRandomGet: ${
                year
              }-${
                month
              }-01
            `
              .trim()
          );

          return movieTitleRandomGet(
            _category
          );
        }

        return (
          title
        );
      }
    );
};

export default movieTitleRandomGet;
