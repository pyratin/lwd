'use strict';

import nodeFetch from './nodeFetch';

const sparqlQueryGet = (
  characterText
) => {

  return encodeURIComponent(
    `
      SELECT ?item ?itemLabel WHERE { ?item wdt:P31 wd:Q5. ?item ?label "${
        characterText
      }"@en. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}

    `
      .trim()
  );
};

const wikidataQueryGet = (
  characterText
) => {

  return `
    https://query.wikidata.org/sparql?format=json&query=${
      sparqlQueryGet(
        characterText
      )
    }
  `
    .trim();
};

const charactersInstanceAssignedGetFn = (
  character
) => {

  return nodeFetch(
    wikidataQueryGet(
      character.text
    )
  )
    .then(
      (
        res
      ) => {

        console.log(
          character.text,
          res.results.bindings
        );
      }
    );
};

const charactersInstanceAssignedGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return memo.then(
        (
          res
        ) => {

          if (
            character.ud
          ) {

            return charactersInstanceAssignedGetFn(
              character
            )
              .then(
                (
                  instance
                ) => {

                  return [
                    ...res,
                    {
                      ...character,
                      instance: (
                        instance
                      ) ?
                        instance :
                        null
                    }
                  ];
                }
              );
          }

          return [
            ...res,
            character
          ];
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

export default async (
  _characters
) => {

  const characters = await charactersInstanceAssignedGet(
    _characters
  );
};
