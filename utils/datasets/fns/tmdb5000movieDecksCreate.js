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
import movieCreate from 
  '~/js/server/schema/mutations/movieCreate';
import {
  deckCreate as deckCreateFn,
  deckFindOne
} from '~/js/server/data/deck';
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

const deckGetFn = async (
  title,
  db
) => {

  return movieCreate(
    title,
    'general',
    db,
    null,
    false,
    false
  );
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
  deck
) => {

  let characters = deck.splash.characters;

  const protagonist = characters?.[
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

const deckGet = async (
  {
    title: _title,
    tagline,
    genres: _genres,
    keywords: _keywords,
    overview
  },
  index,
  page,
  db
) => {

  let exists = await deckFindOne(
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

  exists = await deckFindOne(
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

  const deck = await deckGetFn(
    title,
    db
  );

  const roles = await rolesGet(
    title,
    page,
    deck
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
    index,
    ...deck,
    roles
  };
};

const _decksCreateFn = (
  deck,
  db
) => {

  return deckCreateFn(
    {
      _id: new ObjectID()
    },
    {
      $set: deck
    },
    undefined,
    db
  );
};

const decksCreateFn = (
  _data,
  index,
  page,
  db
) => {

  return deckGet(
    _data,
    index,
    page,
    db
  )
    .then(
      (
        deck
      ) => {

        if (
          !deck?.roles.protagonist ||
          !deck?.roles.romanticLead ||
          !deck?.roles.antagonist
        ) {

          return (
            null
          );
        }

        return _decksCreateFn(
          deck,
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

const decksCreate = async (
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
        index
      ) => {

        return memo.then(
          (
            res
          ) => {

            return decksCreateFn(
              _data,
              index,
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

const tmdb5000movieDecksCreate = async () => {

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

  const decks = 
    await decksCreate(
      data,
      db
    );

  // eslint-disable-next-line no-console
  console.log(
    `
      tmdb5000movieDecksCreate: ${
        decks.length
      }
    `
      .trim()
  );
};


if (
  !module.parent
) {

  tmdb5000movieDecksCreate();
}

export default tmdb5000movieDecksCreate;
