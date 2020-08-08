'use strict';

import path from 'path';
import fs from 'fs';
import cheerio from 'cheerio';

import NNPsGet from 
  '~/js/server/schema/mutations/fns/NNPsGet';

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

  return castLines.reduce(
    (
      memo,
      castLine
    ) => {

      const NNPs = NNPsGet(
        castLine
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
};

const actorsGet = (
  actorTexts,
  castHtml
) => {

  return actorTexts.reduce(
    (
      memo,
      actorText
    ) => {

      const regExpString = `
      <a href="/wiki/(.*?)".*?>${
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
};

const castGet = (
  castHtml
) => {

  if (
    !castHtml
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    castHtml
  );

  const cast = $(
    'body'
  )
    .text();

  const castLines = cast.split(
    /\n/
  )
    .filter(
      (
        castLine
      ) => {

        return (
          !!castLine
        );
      }
    );

  const actorTexts = actorTextsGet(
    castLines
  );

  const actors = actorsGet(
    actorTexts,
    castHtml
  );

  console.log(actors);
};

(
  async () => {
    
    const data = await dataGet();

    const castText = castTextGet(
      data
    );

    castGet(
      castText
    );
  }
)();
