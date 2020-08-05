'use strict';

import path from 'path';
import fs from 'fs';
import cheerio from 'cheerio';

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

const castGetFn = (
  castHtml
) => {

  console.log(castHtml);
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

  $(
    'body'
  )
    .find(
      'ul,ol'
    )
    .find(
      'li'
    )
    .toArray()
    .reduce(
      (
        memo,
        el
      ) => {

        castGetFn(
          $(
            el
          )
            .html()
        );
      },
      []
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
