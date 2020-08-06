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

const actorsGetFn = (
  castLine
) => {

  const NNPs = NNPsGet(
    castLine
  );

};

const actorsGet = (
  castLines
) => {

  return castLines.reduce(
    (
      memo,
      castLine
    ) => {

      const actor = actorsGetFn(
        castLine
      );

      return [
        ...memo,
        actor
      ];
    },
    []
  );
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
    'body'
  )
    .text();

  const castLines = cast.split(
    /\n/
  );

  const actors = actorsGet(
    castLines
  );
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
