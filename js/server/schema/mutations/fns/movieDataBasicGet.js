'use strict';

import mediawikiFetch from './mediawikiFetch';
import movieDataBasicPlotGet from './movieDataBasicPlotGet';
import movieDataBasicCastGet from './movieDataBasicCastGet';

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

      let sectionText = moviePageSectionTextsGetFn(
        json,
        anchorName
      );

      sectionText = sectionText?.replace(
        /\n/g,
        ' '
      );

      sectionText = sectionText?.replace(
        /\s{2,}/g,
        ' '
      );

      return [
        ...memo,
        sectionText
      ];
    },
    []
  );
};

const plotCulledGet = (
  _plot,
  cull
) => {

  const plot = (
    _plot
  ) &&
    _plot.reduce(
      (
        memo,
        sentence
      ) => {

        if (
          (
            cull &&
            memo.length >= 
            3
          ) &&
          (
            !memo[
              memo.length - 1
            ]?.text
              .match(/\s...,$/)
          ) &&
          (
            (
              memo[
                memo.length - 1
              ]?.paragraphIndex !==
              sentence.paragraphIndex
            ) ||
            (
              memo.length >=
              6
            )
          )
        ) {

          return (
            memo
          );
        }

        return [
          ...memo,
          sentence
        ];
      },
      []
    );

  return (
    plot
  );
};

export default async (
  title,
  cull = true
) => {

  // eslint-disable-next-line no-console
  console.log(
    `
      movieDataBasicCastGet: ${
        title
      }
    `
      .trim()
  );

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

  let plot = movieDataBasicPlotGet(
    plotText
  );

  const cast = movieDataBasicCastGet(
    castText,
    plot
  );

  plot = plotCulledGet(
    plot,
    cull
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
