'use strict';

import cheerio from 'cheerio';
import sbd from 'sbd';
import escapeStringRegexp from 'escape-string-regexp';

import nodeFetch from './nodeFetch';

const plotTextActorReferencesClear = (
  plotText,
  actors
) => {

  if (
    !plotText
  ) {

    return (
      plotText
    );
  }

  return actors.reduce(
    (
      memo,
      {
        ud
      }
    ) => {

      if (
        ud
      ) {

        const udEscaped = escapeStringRegexp(
          ud
        );

        const regExp = new RegExp(
          `
            \\s\\(<a href="/wiki/${
              udEscaped
            }".*?</a>\\)
          `
            .trim(),
          'g'
        );

        return memo.replace(
          regExp,
          ''
        );
      }

      return (
        memo
      );
    },
    plotText
  );
};

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
      ^(.*?)\\s+(as\\s+.*)$
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

    role = sbd.sentences(
      role
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

const plotGetFn = (
  paragraph,
  paragraphIndex
) => {

  return sbd.sentences(
    paragraph
  )
    .reduce(
      (
        memo,
        text,
        sentenceIndex
      ) => {

        return [
          ...memo,
          {
            text,
            paragraphIndex,
            sentenceIndex
          }
        ];
      },
      []
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

  const paragraphs = $(
    'p'
  )
    .toArray()
    .reduce(
      (
        memo,
        p,
        paragraphIndex
      ) => {


        let paragraph = $(
          p
        )
          .text();

        const sentences = plotGetFn(
          paragraph,
          paragraphIndex
        );

        return [
          ...memo ||
          [],
          ...sentences
        ];
      },
      null
    );

  return (
    paragraphs
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

  plotText = plotTextActorReferencesClear(
    plotText,
    cast.reduce(
      (
        memo,
        _cast
      ) => {

        return [
          ...memo,
          _cast.actor
        ];
      },
      []
    )
  );

  const plot = plotGet(
    plotText
  );

  return {
    title,
    date,
    image,
    cast,
    plot,
    castText,
    plotText
  };
};
