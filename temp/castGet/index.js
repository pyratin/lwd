'use strict';

import path from 'path';
import fs from 'fs';
import cheerio from 'cheerio';

import NNPsGet from 
  '~/js/server/schema/mutations/fns/NNPsGet';
import parenthesisPurgedGet from 
  '~/js/server/schema/mutations/fns/parenthesisPurgedGet';

const dataPathString = 'data.json';

const dataGet = () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        path.join(
          process.cwd(),
          'temp/castGet',
          dataPathString
        ),
        'utf-8',
        (
          error,
          res
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          return resolve(
            JSON.parse(
              res
            )
          );
        }
      );
    }
  );
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

const castTextGet = (
  data
) => {

  return data.remaining.sections
    .find(
      (
        {
          anchor
        }
      ) => {

        return (
          anchor === 'Cast'
        );
      }
    )
    .text;
};

const actorTextsGet = (
  castLines
) => {

  const actorTexts = castLines.reduce(
    (
      memo,
      castLine
    ) => {

      const NNPs = NNPsGet(
        castLine,
        true
      );

      const actor = NNPs.find(
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
        actor
      ) {

        return [
          ...memo,
          actor.text
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    actorTexts
  );
};

const actorsGet = (
  actorTexts,
  castHtml
) => {

  const actors = actorTexts.reduce(
    (
      memo,
      actorText
    ) => {

      const hrefCatchString = '[A-Za-z0-9_()]*?';

      const regExpString = `
      <a href="/wiki/(${
        hrefCatchString
      })" [^>]*?>${
          actorText
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
            text: actorText,
            ud: match[1]
          }
        ];
      }

      return [
        ...memo,
        {
          text: actorText,
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
  _plotText
) => {

  const plotText = parenthesisPurgedGet(
    _plotText
  );

  const actors = _actors.reduce(
    (
      memo,
      {
        text,
        ud
      }
    ) => {

      const match = plotText.match(
        text
      );

      if (
        match &&
        !ud
      ) {

        return (
          memo
        );
      }

      return [
        ...memo,
        {
          text,
          ud
        }
      ];
    },
    []
  );

  return (
    actors
  );
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
  plotText
) => {

  if (
    !_castText ||
    !plotText
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

  const actorTexts = actorTextsGet(
    castLines
  );

  let actors = actorsGet(
    actorTexts,
    _castText
  );

  actors = actorsFilteredGet(
    actors,
    plotText
  );
  console.log(actors);

  const cast = castGetFn(
    actors,
    castLines
  );

};

(
  async () => {
    
    const json = await dataGet();

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

    castGet(
      castText,
      plotText
    );
  }
)();
