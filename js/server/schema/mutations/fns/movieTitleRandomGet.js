'use strict';

import moment from 'moment';

import mediawikiFetch from './mediawikiFetch';
import movieDataBasicGet from './movieDataBasicGet';
import charactersBasicGet from './charactersBasicGet';
import segmentsGet from '../fns/segmentsGet';
import cardsBasicGet from
  './cardsBasicGet';

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
  _category
) => {

  const category = categoryGet(
    _category 
  );

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

  //eslint-disable-next-line
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

  if (
    !movieDataBasic?.plot ||
    !movieDataBasic?.cast
  ) {

    return (
      null
    );
  }

  const characters = charactersBasicGet(
    movieDataBasic.cast,
    movieDataBasic.plot
  );

  const segments = segmentsGet(
    movieDataBasic.plot,
    characters
  );

  const cards = cardsBasicGet(
    segments
  );

  const characterTexts = cards.reduce(
    (
      memo,
      card
    ) => {

      if (
        card.character &&
        card.character.text
      ) {

        return[
          ...new Set(
            [
              ...memo,
              card.character.text
            ]
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  if (
    characterTexts.length <
    3
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
  category
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
      1, 'month'
    )
    .toISOString();

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
            `
              random:${
                category
              }
            `
              .trim()
          );
        }

        return (
          title
        );
      }
    );
};

export default movieTitleRandomGet;
