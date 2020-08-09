'use strict';

import cheerio from 'cheerio';

import sentencesTokenizedGet from './sentencesTokenizedGet';

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

export default (
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
  console.log(cast);

  return (
    cast
  );
};
