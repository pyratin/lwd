'use strict';

import path from 'path';
import fs from 'fs';
import {
  ObjectID
} from 'mongodb';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

import {
  mongoUriGet
} from '~/js/server/fns/variable';
import mongoClientConnect
  from '~/js/server/fns/mongoClientConnect';
import jsonFromCsvGet from './jsonFromCsvGet';
import movieSearch from 
  '~/js/server/schema/mutations/movieSearch';
import movieDataBasicGet from
  '~/js/server/schema/mutations/fns/movieDataBasicGet';
import charactersGet from 
  '~/js/server/schema/mutations/fns/charactersGet';
import cardsGet from 
  '~/js/server/schema/mutations/fns/cardsGet';
import charactersFromCardsGet from 
  '~/js/server/schema/mutations/fns/charactersFromCardsGet';
import {
  semiCreate as semiCreateFn,
  semiFindOne
} from '~/js/server/data/semi';
import NNPCrossMatchGet
  from '~/js/server/schema/mutations/fns/NNPCrossMatchGet';

const dataFilename = 'tmdb_5000_movies';

const datasetsFolderPathString = 'temp/datasets';

const googleUrl = 'https://google.com';

const dataGet = (
  jsonFilePath
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        jsonFilePath,
        'utf8',
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

const titleMatchGet = (
  _title
) => {

  return movieSearch(
    _title,
    1,
    false
  )
    .then(
      (
        res
      ) => {

        const title = res[
          0
        ]?.title;

        const match = title?.match(
          _title
        );

        return (
          match
        ) ?
          title :
          null;
      }
    );
};

const semiDataGet = async (
  title,
  db
) => {

  let movieDataBasic = await movieDataBasicGet(
    title,
    false
  );

  let characters = await charactersGet(
    movieDataBasic.cast,
    movieDataBasic.plot,
    movieDataBasic.plotText
  );

  const cards = await cardsGet(
    movieDataBasic.plot,
    characters,
    'general',
    db,
    false
  );

  return {
    title: movieDataBasic.title,
    poster: movieDataBasic.poster,
    cards
  };
};

const romanticLeadGet = (
  protagonist,
  characters
) => {

  return characters.find(
    (
      {
        actor: {
          gender
        }
      }
    ) => {

      return (
        gender !==
        protagonist.actor.gender
      );
    }
  );
};

const NNPCrossMatchesGet = (
  characterText,
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const match = NNPCrossMatchGet(
        characterText,
        character.text
      );

      if (
        !memo &&
        match
      ) {

        return (
          character
        );
      }

      return (
        memo
      );
    },
    null
  );
};

const antagonistGet = async (
  role,
  title,
  page,
  characters
) => {

  await page.goto(
    googleUrl,
    {
      waitUntil: 'networkidle0'
    }
  );

  const searchString =`
    ${
      title
    } ${
      role
    }
  `
    .trim();

  await page.type(
    'input[name=q]',
    searchString,
    {
      delay: 100
    }
  );

  await page.click(
    'input[type="submit"]'
  );

  const selector = '#search';

  await page.waitForSelector(
    selector
  );

  const html = (
    await page.evaluate(
      (
        selector
      ) => {

        const el = document.querySelector(
          selector
        );

        return (
          el.innerHTML
        );
      },
      selector
    )
  );

  const $ = cheerio.load(
    html
  );

  const attr = 'data-tts-text';

  const characterText = $(
    `
      div[${
        attr
      }]
    `
      .trim()
  )
    .attr(
      attr
    );

  const character = NNPCrossMatchesGet(
    characterText,
    characters
  );

  return (
    character
  );
};

const rolesCleanedGet = (
  roles
) => {

  return Object.keys(
    roles
  )
    .reduce(
      (
        memo,
        key
      ) => {

        const {
          text,
          actor
        } = roles[
          key
        ];

        return {
          ...memo,
          [key]: {
            text,
            actor
          }
        };
      },
      {}
    );
};

const rolesGet = async (
  title,
  page,
  cards
) => {

  const characters = charactersFromCardsGet(
    cards
  );

  const protagonist = characters[
    0
  ];

  const romanticLead = romanticLeadGet(
    protagonist,
    characters
  );

  const antagonist = await antagonistGet(
    'antagonist',
    title,
    page,
    characters
  );

  let roles = {
    protagonist,
    romanticLead,
    antagonist
  };

  roles = rolesCleanedGet(
    roles
  );

  return (
    roles
  );
};

const semiCreate = (
  semiData,
  db
) => {

  return semiCreateFn(
    {
      _id: new ObjectID()
    },
    {
      $set: semiData
    },
    undefined,
    db
  );
};

const tmdb5000movieSemiCreate = async (
  {
    title: _title,
    tagline,
    genres,
    keywords,
    overview
  },
  page,
  db
) => {

  let exists = await semiFindOne(
    {
      _title
    },
    undefined,
    db
  );

  if (
    exists
  ) {

    return Promise.resolve(
      null
    );
  }

  const title = await titleMatchGet(
    _title
  );

  if (
    !title
  ) {

    return Promise.resolve();
  }

  exists = await semiFindOne(
    {
      title
    },
    undefined,
    db
  );

  if (
    exists
  ) {

    return Promise.resolve(
      null
    );
  }

  const semiData = await semiDataGet(
    title,
    db
  );

  const roles = await rolesGet(
    _title,
    page,
    semiData.cards
  );

  return semiCreate(
    {
      ...semiData,
      _title,
      tagline,
      genres: JSON.parse(
        genres
      )
        .map(
          (
            {
              name
            }
          ) => {

            return (
              name
            );
          }
        ),
      keywords: JSON.parse(
        keywords
      )
        .map(
          (
            {
              name
            }
          ) => {

            return (
              name
            );
          }
        ),
      overview,
      source: 'tmdb5000movies',
      roles
    },
    db
  );
};

const tmdb5000moviesSemisCreateFn = async (
  data,
  db
) => {

  const browser = await puppeteer.launch(
    {
      args: [
        '--no-sandbox'
      ]
    }
  );

  const page = await browser.newPage();

  return data
    .reduce(
      (
        memo,
        _data
      ) => {

        return memo.then(
          (
            res
          ) => {

            return tmdb5000movieSemiCreate(
              _data,
              page,
              db
            )
              .then(
                (
                  result
                ) => {

                  return [
                    ...res,
                    result
                  ];
                }
              );
          }
        );
      },
      Promise.resolve(
        []
      )
    );
};

const tmdb5000moviesSemisCreate = async () => {

  const db = await mongoClientConnect(
    mongoUriGet()
  );

  await jsonFromCsvGet(
    dataFilename,
    datasetsFolderPathString
  );

  const jsonFilePath = path.join(
    process.cwd(),
    datasetsFolderPathString,
    'json',
    `
      ${
        dataFilename
      }.json
    `
      .trim()
  );

  const data = await dataGet(
    jsonFilePath
  );

  const tmdb5000moviesSemis = 
    await tmdb5000moviesSemisCreateFn(
      data,
      db
    );

  // eslint-disable-next-line no-console
  console.log(
    `
      tmdb5000moviesSemisCreate: ${
        tmdb5000moviesSemis.length
      }
    `
      .trim()
  );
};


if (
  !module.parent
) {

  tmdb5000moviesSemisCreate();
}

export default tmdb5000moviesSemisCreate;
