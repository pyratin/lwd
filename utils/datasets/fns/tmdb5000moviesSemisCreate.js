'use strict';

import path from 'path';
import fs from 'fs';
import {
  ObjectID
} from 'mongodb';
import puppeteer from 'puppeteer';

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
import NNPsGet 
  from '~/js/server/schema/mutations/fns/NNPsGet';
import NNPCrossMatchesGet
  from '~/js/server/schema/mutations/fns/NNPCrossMatchesGet';

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

const tmdb5000movieSemiDataGetFn = async (
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

const charactersFilteredGet = (
  characters,
  _characters
) => {

  return _characters.filter(
    (
      {
        text
      }
    ) => {

      const exists = characters.find(
        (
          character
        ) => {

          return (
            text === 
            character?.text
          );
        }
      );

      return (
        !exists
      );
    }
  );
};

const antagonistGetFn = (
  text,
  characters
) => {

  const NNPs = NNPsGet(
    text
  );

  let matches = characters.reduce(
    (
      memo,
      character
    ) => {

      const matches = NNPCrossMatchesGet(
        character,
        NNPs
      );

      if (
        matches
      ) {

        return [
          ...memo,
          ...matches.map(
            (
              match
            ) => {

              return {
                ...match,
                character
              };
            }
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  matches = matches.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.distance >
          b.distance
        ) :

          return 1;

        case (
          b.distance >
          a.distance
        ) :

          return -1;
      }
    }
  );

  return matches?.[
    0
  ]?.character;
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

  await page.evaluate(
    () => {

      document.querySelector(
        'input[type="submit"]'
      )
        .click();
    }
  );

  const selector = '#search';

  await page.waitForSelector(
    selector
  );

  const text = (
    await page.evaluate(
      (
        selector
      ) => {

        const el = document.querySelector(
          selector
        );

        return (
          el.innerText
        );
      },
      selector
    )
  );

  if (
    !text
  ) {

    return (
      null
    );
  }

  const antagonist = antagonistGetFn(
    text,
    characters
  );

  return (
    antagonist
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

        const value = roles[
          key
        ];

        if (
          value
        ) {

          return {
            ...memo,
            [key]: {
              text: value.text,
              actor: value.actor
            }
          };
        }

        return (
          memo
        );
      },
      {}
    );
};

const rolesGet = async (
  title,
  page,
  cards
) => {

  let characters = charactersFromCardsGet(
    cards
  );

  const protagonist = characters[
    0
  ];

  const romanticLead = romanticLeadGet(
    protagonist,
    characters
  );

  characters = charactersFilteredGet(
    [
      protagonist,
      romanticLead
    ],
    characters
  );

  const antagonist = await antagonistGet(
    'antagonist',
    title,
    page,
    characters.filter(
      (
        {
          text
        }
      ) => {

        return (
          (
            text !== 
            protagonist.text
          ) &&
          (
            text !==
            romanticLead.text
          )
        );
      }
    )
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

const tmdb5000movieSemiGet = async (
  {
    title: _title,
    tagline,
    genres: _genres,
    keywords: _keywords,
    overview
  },
  tmdb5000moviesIndex,
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

  const semiData = await tmdb5000movieSemiDataGetFn(
    title,
    db
  );

  const roles = await rolesGet(
    title,
    page,
    semiData.cards
  );

  const genres = JSON.parse(
    _genres
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
    );

  const keywords = JSON.parse(
    _keywords
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
    );

  return {
    source: 'tmdb5000movies',
    title,
    _title,
    tagline,
    overview,
    genres,
    keywords,
    tmdb5000moviesIndex,
    ...semiData,
    roles
  };
};

const tmdb5000movieSemiCreateFn = (
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

const tmdb5000movieSemiCreate = (
  _data,
  tmdb5000moviesIndex,
  page,
  db
) => {

  return tmdb5000movieSemiGet(
    _data,
    tmdb5000moviesIndex,
    page,
    db
  )
    .then(
      (
        semiData
      ) => {

        if (
          !semiData.roles.protagonist ||
          !semiData.roles.romanticLead ||
          !semiData.roles.antagonist
        ) {

          return (
            null
          );
        }

        return tmdb5000movieSemiCreateFn(
          semiData,
          db
        );
      }
    )
    .catch(
      (
        error
      ) => {

        // eslint-disable-next-line no-console
        console.log(
          error
        );
      }
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
        _data,
        tmdb5000moviesIndex
      ) => {

        return memo.then(
          (
            res
          ) => {

            return tmdb5000movieSemiCreate(
              _data,
              tmdb5000moviesIndex,
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
