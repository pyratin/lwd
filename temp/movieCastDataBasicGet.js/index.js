'use strict';

import minimist from 'minimist';

import mediawikiFetch from 
  '~/js/server/schema/mutations/fns/mediawikiFetch';
import movieDataBasicPlotGet from 
  '~/js/server/schema/mutations/fns/movieDataBasicPlotGet';
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

      const sectionText = moviePageSectionTextsGetFn(
        json,
        anchorName
      );

      return [
        ...memo,
        sectionText
          .replace(
            /\n/g,
            ''
          )
      ];
    },
    []
  );
};

(
  async () => {

    const {
      text
    } = minimist(
      process.argv
        .slice(
          2
        )
    );
    
    const query = pageMobileSectionQueryGet(
      text
    );

    const json = await mediawikiFetch(
      query
    );

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

    const plot = movieDataBasicPlotGet(
      plotText
    );

    const cast = movieDataBasicCastGet(
      castText,
      plot
    );

    return {
      plot,
      cast
    };
  }
)();
