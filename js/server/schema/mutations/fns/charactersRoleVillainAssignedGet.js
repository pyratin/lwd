'use strict';

import puppeteer from 'puppeteer';

import plotNNPsGet from './plotNNPsGet';
import NNPCrossMatchesGet from './NNPCrossMatchesGet';

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

const antagonistGetFn = (
  characters,
  text
) => {

  if (
    !text
  ) {

    return (
      null
    );
  }

  const NNP = plotNNPsGet(
    [
      {
        text
      }
    ]
  )?.[
    0
  ];

  if (
    !NNP
  ) {

    return (
      null
    );
  }

  const _NNPs = _NNPsGet(
    characters
  );

  let matches = NNPCrossMatchesGet(
    NNP,
    _NNPs
  );

  const character = characters?.[
    _NNPs?.[
      matches?.[
        0
      ]?._NNPIndex
    ]?.index
  ];

  return (
    character &&
    (
      character.actor.gender !== 
      'woman'
    ) &&
    character.castIndex
  ) ?
    character :
    null;
};

const antagonistGet = async (
  characters,
  title
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
    'https://google.com',
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
    characters,
    text
  );

  return (
    antagonist
  );
};

const charactersGet = (
  characters,
  antagonist
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      if (
        character.text ===
        antagonist?.text
      ) {

        return [
          ...memo,
          {
            ...character,
            role: 'villain'
          }
        ];
      }

      return [
        ...memo,
        character
      ];
    },
    []
  );
};

export default async (
  _characters,
  title
) => {

  const antagonist = await antagonistGet(
    _characters,
    title
  );

  const characters = charactersGet(
    _characters,
    antagonist
  );

  return (
    characters
  );
};
