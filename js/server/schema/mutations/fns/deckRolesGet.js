'use strict';

import puppeteer from 'puppeteer';

import plotNNPsGet from './plotNNPsGet';
import NNPsCrossMatchesGet from './NNPsCrossMatchesGet';
import actorGenderGet from './actorGenderGet';

const googleUrl = 'https://google.com';

const _NNPsGet = (
  characters
) => {

  return characters.map(
    (
      {
        text
      },
      index
    ) => {

      return {
        text,
        index
      };
    }
  );
};

const antagonistGetFn = async (
  text,
  characters
) => {

  if (
    !text
  ) {

    return (
      null
    );
  }

  const NNPs = plotNNPsGet(
    [
      {
        text
      }
    ]
  );

  const _NNPs = _NNPsGet(
    characters
  );

  let matches = NNPsCrossMatchesGet(
    NNPs,
    _NNPs
  );

  matches = matches.sort(
    (
      a, b
    ) => {

      const aNNP = NNPs[
        a.NNPIndex
      ];

      const bNNP = NNPs[
        b.NNPIndex
      ];

      switch (
        true
      ) {

        case (
          aNNP.distance >
          bNNP.distance
        ) :

          return 1;

        case (
          bNNP.distance >
          aNNP.distance
        ) :

          return -1;
      }
    }
  );

  const character = characters?.[
    _NNPs?.[
      matches?.[
        0
      ]?._NNPIndex
    ]?.index
  ];

  const gender = (
    character
  ) &&
    await actorGenderGet(
      character.actor
    );

  return (
    character &&
    (
      gender === 
      'man'
    )
  ) ?
    character :
    null;
};

const antagonistGet = async (
  title,
  characters
) => {

  const browser = await puppeteer.launch(
    {
      args: [
        '--no-sandbox'
      ]
    }
  );

  const page = await browser.newPage();

  await page.goto(
    googleUrl,
    {
      waitUntil: 'networkidle0'
    }
  );

  const searchString =`
    ${
      title
    } antagonist
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

  const selector = '[aria-level="3"][role="heading"]';

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

  const antagonist = antagonistGetFn(
    text,
    characters
  );

  return (
    antagonist
  );
};

const protagonistGet = async (
  characters,
  antagonist
) => {

  if (
    !antagonist
  ) {

    return (
      null
    );
  }

  const protagonist = characters?.[
    0
  ];

  const gender = await actorGenderGet(
    protagonist.actor
  );

  return (
    (
      protagonist.text !==
      antagonist?.text
    ) &&
    (
      gender ===
      'man'
    )
  ) ?
    protagonist :
    null;
};

const romanticLeadGetFn = async (
  actor,
  exists
) => {

  if (
    exists
  ) {

    return (
      null
    );
  }

  const gender = await actorGenderGet(
    actor
  );

  return (
    gender ===
    'woman'
  ) ?
    actor :
    null;
};

const romanticLeadGet = async (
  characters,
  protagonist,
  antagonist
) => {

  if (
    !protagonist ||
    !antagonist
  ) {

    return (
      null
    );
  }

  const actors = characters.reduce(
    (
      memo,
      character
    ) => {
      
      const exists = memo.find(
        (
          _memo
        ) => {

          return (
            _memo.text ===
            character.actor.text
          );
        }
      );

      if (
        !exists &&
        (
          character.actor.text !==
          protagonist.actor.text
        ) &&
        (
          character.actor.text !==
          antagonist.actor.text
        )
      ) {

        return [
          ...memo,
          character.actor
        ];
      }

      return (
        memo
      );
    },
    []
  );

  const actor = await actors.reduce(
    (
      memo,
      actor
    ) => {

      return memo.then(
        (
          res
        ) => {

          return romanticLeadGetFn(
            actor,
            res
          )
            .then(
              (
                result
              ) => {

                if (
                  result
                ) {

                  return (
                    actor
                  );
                }

                return (
                  res
                );
              }
            );
        }
      );
    },
    Promise.resolve(
      null
    )
  );

  return (
    characters.find(
      (
        character
      ) => {

        return (
          character.actor.text ===
          actor?.text
        );
      }
    ) ||
    null
  );
};

export default async (
  title,
  characters
) => {

  const antagonist = await antagonistGet(
    title,
    characters
  );

  const protagonist = await protagonistGet(
    characters,
    antagonist
  );

  const romanticLead = await romanticLeadGet(
    characters,
    protagonist,
    antagonist
  );

  return (
    protagonist &&
    romanticLead &&
    antagonist
  ) ? 
    {
      protagonist,
      romanticLead,
      antagonist
    } :
    null;
};
