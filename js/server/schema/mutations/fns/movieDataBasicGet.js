'use strict';

import cheerio from 'cheerio';

import mediawikiFetch from './mediawikiFetch';
import sentencesTokenizedGet from './sentencesTokenizedGet';
import sentencesGet from './sentencesGet';

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

const moviePageSectionTextsGetFn = (
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
          anchor.match(
            new RegExp(
              `
                ${
                  anchorName
                }
              `
                .trim(),
              'i'
            )
          )
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

      const sectionText = moviePageSectionTextsGetFn(
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

const castGetFn = (
  castHtml
) => {

  const $ = cheerio.load(
    castHtml
  );

  const castEl = $(
    'span, sup'
  )
    .remove()
    .end();

  const castText = castEl.text();

  const textRegExp = new RegExp(
    `
      ^(.*?)\\s+((?:as|—)(?:\\s|:)(\\n*.*)*)$
    `
      .trim()
  );

  const textMatch = castText.match(
    textRegExp
  );

  let actorUd;

  let actorText;

  let role;

  if (
    textMatch
  ) {

    [
      ,
      actorText,
      role
    ] = textMatch;

    role = sentencesTokenizedGet(
      role
    )[
      0
    ];

    role = role.split(
      ','
    )[
      0
    ];
  }

  const htmlRegExp = /^<a/;

  const htmlMatch = castHtml.match(
    htmlRegExp
  );

  if (
    actorText &&
    role &&
    htmlMatch
  ) {

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

const castGet = (
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
        ] = castGetFn(
          $(castEl)
            .html()
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

const plotGet = (
  plotText
) => {

  if (
    !plotText
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    plotText
  );

  const plotEl = $(
    'span, sup'
  )
    .remove()
    .end();

  let paragraphs = plotEl
    .find(
      'p'
    )
    .toArray();

  if (
    !paragraphs.length
  ) {

    return (
      null
    );
  }

  paragraphs = paragraphs.reduce(
    (
      memo,
      p
    ) => {

      let paragraph = $(
        p
      )
        .text();

      return [
        ...memo ||
        [],
        paragraph
      ];
    },
    null
  );

  const sentences = sentencesGet(
    paragraphs
  );

  return (
    sentences
  );
};

export default async (
  title
) => {

  const query = pageMobileSectionQueryGet(
    title
  );

  const json = await mediawikiFetch(
    query
  );

  const poster = (
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

  let [
    castText,
    plotText
  ] = moviePageSectionTextsGet(
    json,
    anchorNames
  );

  const cast = castGet(
    castText
  );

  const plot = plotGet(
    plotText
  );

  return {
    title,
    poster,
    cast,
    plot,
    castText,
    plotText
  };
};
