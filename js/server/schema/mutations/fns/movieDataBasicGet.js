'use strict';

import cheerio from 'cheerio';

import nodeFetch from './nodeFetch';

const titleEncodedGet = (
  title
) => {

  return encodeURIComponent(
    title
  );
};

const pageMobileSectionQueryGet = (
  title
) => {

  return `
    https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${
      titleEncodedGet(
        title
      )
    }
  `
    .trim();
};

const moviePageSectionTextGet = (
  json,
  anchorName
) => {

  const section = json.remaining.sections
    .find(
      (
        {
          anchor
        }
      ) => {

        return (
          anchor ===
          anchorName
        );
      }
    );

  return (
    section
  ) &&
    section.text;
};

const moviePageSectionTextsGet = (
  json,
  anchorNames
) => {

  return anchorNames.reduce(
    (
      memo,
      anchorName
    ) => {

      const sectionText = moviePageSectionTextGet(
        json,
        anchorName
      );

      return [
        ...memo,
        sectionText
      ];
    },
    []
  );
};

const pageTitleFromUrlGet = (
  url
) => {

  return url.split(
    /\//
  )
    .slice(
      -1
    )[
      0
    ];
};

const movieDataBasicCastGetFn = (
  _castEl
) => {

  const $ = cheerio.load(
    _castEl
  );

  const castEl = $(
    'span.mw-ref'
  )
    .remove()
    .end();

  const castText = castEl.text();

  const regExp = new RegExp(
    `
      ^(.*)\\s+(as\\s+.*)$
    `
      .trim()
  );

  const match = castText.match(
    regExp
  );

  let actorUd;

  let actorText;

  let role;

  if (
    match
  ) {

    [
      ,
      actorText,
      role
    ] = match;

    const actorLinkEl = $(
      castEl
    )
      .find(
        'a:first-child'
      );

    actorUd = (
      actorLinkEl.length
    ) ?
      pageTitleFromUrlGet(
        actorLinkEl.attr(
          'href'
        )
      ) :
      null;
  }

  return [
    actorUd,
    actorText,
    role
  ];
};

const movieDataBasicCastGet = (
  castText
) => {

  if (
    !castText
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    castText
  );

  const cast = $(
    'li'
  )
    .toArray()
    .reduce(
      (
        memo,
        castEl
      ) => {

        const [
          actorUd,
          actorText,
          role
        ] = movieDataBasicCastGetFn(
          castEl
        );

        if (
          actorText &&
          role
        ) {

          return [
            ...memo ||
            [],
            {
              actor: {
                ud: actorUd,
                text: actorText
              },
              role
            }
          ];
        }

        return (
          memo
        );
      },
      null
    );

  return (
    cast
  );
};

export default async (
  title
) => {

  const query = pageMobileSectionQueryGet(
    title
  );

  const json = await nodeFetch(
    query
  );

  const date = new Date(
    json.lead?.lastmodified
  );

  const image = (
    json.lead?.image
  ) ?
    Object.values(
      json.lead.image.urls
    )[
      0
    ]:
    null;

  const anchorNames = [
    'Cast',
    'Plot'
  ];

  const [
    castText,
    plotText
  ] = moviePageSectionTextsGet(
    json,
    anchorNames
  );

  const cast = movieDataBasicCastGet(
    castText
  );

  console.log(title, cast);

  return {
    title,
    date,
    image,
    cast
  };
};
