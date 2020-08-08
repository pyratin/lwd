'use strict';

import minimist from 'minimist';
import cheerio from 'cheerio';

import mediawikiFetch from 
  '~/js/server/schema/mutations/fns/mediawikiFetch';
import movieDataBasicPlotGet from 
  '~/js/server/schema/mutations/fns/movieDataBasicPlotGet';
import plotNNPsGet from 
  '~/js/server/schema/mutations/fns/plotNNPsGet';
import NNPsGet from 
  '~/js/server/schema/mutations/fns/NNPsGet';
import NNPCrossMatchesGet from 
  '~/js/server/schema/mutations/fns/NNPCrossMatchesGet';

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

const actorNNPsGet = (
  castLines
) => {

  const NNPs = castLines.reduce(
    (
      memo,
      castLine
    ) => {

      const NNPs = NNPsGet(
        castLine,
        true
      );

      const NNP = NNPs.find(
        (
          {
            distance
          }
        ) => {

          return (
            distance ===
            0
          );
        }
      );

      if (
        NNP
      ) {

        return [
          ...memo,
          NNP
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    NNPs
  );
};

const actorsUdAssignedGet = (
  _actors,
  castHtml
) => {

  const actors = _actors.reduce(
    (
      memo,
      actor
    ) => {

      const hrefCatchString = '[A-Za-z0-9_()]*?';

      const regExpString = `
      <a href="/wiki/(${
        hrefCatchString
      })" [^>]*?>${
          actor.text
        }</a>
      `
        .trim();

      const regExp = new RegExp(
        regExpString,
      );

      const match = castHtml.match(
        regExp
      );

      if (
        match
      ) {

        return [
          ...memo,
          {
            ...actor,
            ud: match[1]
          }
        ];
      }

      return [
        ...memo,
        {
          ...actor,
          ud: null
        }
      ];
    },
    []
  );

  return (
    actors
  );
};

const actorsFilteredGet = (
  _actors,
  plot
) => {

  const plotCharacters = plotNNPsGet(
    plot
  );

  const characters = NNPCrossMatchesGet(
    plotCharacters,
    _actors
  );
  console.log(characters);

};

const castGetFn = (
  actors,
  castLines
) => {

  const castText = castLines.join(
    '\n'
  );

  const cast = actors.reduce(
    (
      memo,
      actor,
      index
    ) => {

      let role = castText.split(
        actor.text
      )[
        1
      ];

      if (
        actors.length >
        (
          index + 1
        )
      ) {

        role = role.split(
          actors[
            index + 1
          ]
            .text
        )[
          0
        ];
      }

      return [
        ...memo,
        {
          actor,
          role
        }
      ];
    },
    []
  );

  return (
    cast
  );
};

const castGet = (
  _castText,
  plot
) => {

  if (
    !_castText ||
    !plot
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    _castText
  );

  const castLines = $(
    'li'
  )
    .toArray()
    .map(
      (
        el
      ) => {

        return $(
          el
        )
          .text();
      }
    );

  let actors = actorNNPsGet(
    castLines
  );

  actors = actorsUdAssignedGet(
    actors,
    _castText
  );

  actors = actorsFilteredGet(
    actors,
    plot
  );

  //const cast = castGetFn(
    //actors,
    //castLines
  //);

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

    castGet(
      castText,
      plot
    );
  }
)();
