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
  text
) => {

  const [
    _category,
    year
  ] = text.split(
    /:/
  );

  const category = categoryGet(
    _category 
  );

  const cmstart = new Date(
    moment(
      `
        ${
          year
        }-01-01
      `
        .trim()
    )
  )
    .toISOString();

  const cmend = new Date(
    moment(
      cmstart
    )
      .add(
        1, 'year'
      )
  )
    .toISOString();

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

const movieTitleRandomGet = (
  text
) => {

  const query = queryGet(
    text
  );

  return mediawikiFetch(
    query
  )
    .then(
      (
        res
      ) => {

        const categorymembers = res.query.categorymembers;

        const title = categorymembers[
          Math.floor(
            Math.random() *
            categorymembers.length
          )
        ]
          .title;

        return (
          title
        );
      }
    )
    .then(
      async (
        title
      ) => {

        //eslint-disable-next-line no-console
        console.log(
          `
            title: ${
              title
            }
          `
            .trim()
        );

        const movieDataBasic = await movieDataBasicGet(
          title
        );

        return (
          movieDataBasic.plot &&
          movieDataBasic.cast
        ) ?
          title :
          movieTitleRandomGet(
            text
          );
      }
    );
};

export default movieTitleRandomGet;
