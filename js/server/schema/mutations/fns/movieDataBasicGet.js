'use strict';

import cheerio from 'cheerio';
import sbd from 'sbd';
import escapeStringRegexp from 'escape-string-regexp';

import nodeFetch from './nodeFetch';

const sentenceMaxLength = 100;

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

const plotTextActorTextsRemove = (
  plotText,
  cast
) => {

  if (	
    !plotText	||
    !cast
  ) {	

    return (	
      plotText	
    );	
  }	

  return cast.reduce(
    (
      memo,
      _cast
    ) => {

      const regExp = new RegExp(
        `
          \\s(\\(${
            _cast.actor.text
          }\\))
        `
          .trim(),
        'g'
      );

      return memo.replace(
        regExp,
        ''
      );
    },
    plotText
  );
};

const plotTextActorLinksRemove = (	
  plotText,	
  cast
) => {	

  if (	
    !plotText	||
    !cast
  ) {	

    return (	
      plotText	
    );	
  }	

  return cast.reduce(	
    (	
      memo,	
      _cast
    ) => {	

      if (	
        _cast.actor.ud
      ) {	

        const udEscaped = escapeStringRegexp(	
          _cast.actor.ud
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

const sentenceNormalizedGetFn = (
  text
) => {

  return text
    .split(
      /,/
    )
    .reduce(
      (
        memo,
        _text
      ) => {

        switch (
          true
        ) {

          case (
            !memo.length
          ) :

            return [
              _text
            ];

          case (
            (
              memo.length < 
              2
            ) &&
            (
              memo[
                0
              ]
                .length +
              _text.length
            ) < 
            sentenceMaxLength
          ) :

            return [
              `
                ${
                  memo[
                    0
                  ]
                    .trim()
                }, ${
                  _text.trim()
                }
              `
                .trim()
            ];

          case (
            memo.length < 2
          ) :

            return [
              memo[
                0
              ],
              _text.trim()
            ];

          default:

            return [
              memo[
                0
              ],
              `
                ${
                  memo[
                    1
                  ]
                    .trim()
                }, ${
                  _text.trim()
                }
              `
                .trim()
            ];
        }
      },
      []
    );
};

const sentenceNormalizedGet = (
  text
) => {

  let texts = [
    text
  ];

  while (
    (
      (
        texts[
          texts.length - 1
        ]
          .length
      ) >
      sentenceMaxLength
    ) &&
    (
      !!texts[
        texts.length -1
      ]
        .match(
          /,/
        )
    )
  ) {

    texts = [
      ...texts.slice(
        0, -1
      ),
      ...sentenceNormalizedGetFn(
        texts[
          texts.length - 1
        ]
      )
    ];
  }

  texts = texts.reduce(
    (
      memo,
      text,
      index
    ) => {

      if (
        index <
        (
          texts.length - 1
        )
      ) {

        return [
          ...memo,
          `
            ${
            text
            } ...,
          `
            .trim()
        ];
      }

      return [
        ...memo,
        text
      ];
    },
    []
  );

  return (
    texts
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
        text
      ) => {

        return [
          ...memo,
          text
        ];
      },
      []
    )
    .reduce(
      (
        memo,
        text
      ) => {

        return [
          ...memo,
          ...sentenceNormalizedGet(
            text
          )
        ];
      },
      []
    )
    .map(
      (
        text,
        sentenceIndex
      ) => {

        return {
          text,
          paragraphIndex,
          sentenceIndex
        };
      }
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

  const paragraphs = plotEl
    .find(
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

  plotText = plotTextActorTextsRemove(
    plotText,
    cast
  );

  plotText = plotTextActorLinksRemove(
    plotText,
    cast
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
