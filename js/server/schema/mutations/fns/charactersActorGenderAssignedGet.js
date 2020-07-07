'use strict';

import cheerio from 'cheerio';
import sbd from 'sbd';

import nodeFetch from './nodeFetch';

const actorGet = (
  {
    ud: actorUd
  },
  actors
) => {

  return actors.find(
    (
      {
        ud: _actorUd
      }
    ) => {

      return (
        _actorUd ===
        actorUd
      );
    }
  );
};

const actorsUniqueGet = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      {
        actor
      }
    ) => {

      if (
        !actorGet(
          actor,
          memo
        )
      ) {

        return [
          ...memo,
          actor
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const queryGet = (
  actorUd
) => {

  return `
    https://en.wikipedia.org/api/rest_v1/page/mobile-sections-lead/${
      actorUd
    }
  `
    .trim();
};

const actorsGenderAssignedGetFn = (
  actorUd
) => {

  return nodeFetch(
    queryGet(
      actorUd
    )
  )
    .then(
      (
        res
      ) => {

        const sectionLeadText = res.sections[
          0
        ]
          .text;

        const $ = cheerio.load(
          sectionLeadText
        );

        const [
          paragraphLead
        ] = $(
          'p'
        )
          .toArray()
          .map(
            (
              pEl
            ) => {

              return $(pEl)
                .text();
            }
          );

        const sentenceLead = sbd.sentences(
          paragraphLead
        )[
          0
        ];

        switch (
          true
        ) {

          case (
            !!sentenceLead.match(
              /(actor|comedian)/
            )
          ) :

            return (
              'man'
            );

          case (
            !!sentenceLead.match(
              /actress/
            )
          ) :

            return (
              'woman'
            );

          default :

            return (
              null
            );
        }
      }
    );
};

const actorsGenderAssignedGet = (
  actors
) => {

  return actors.reduce(
    (
      memo,
      actor
    ) => {

      return memo.then(
        (
          res
        ) => {

          if (
            actor.ud
          ) {

            return actorsGenderAssignedGetFn(
              actor.ud
            )
              .then(
                (
                  result
                ) => {

                  return [
                    ...res,
                    {
                      ...actor,
                      gender: result
                    }
                  ];
                }
              );
          }

          return (
            res
          );
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};

const charactersActorGenderAssignedGetFn = (
  character,
  actors
) => {

  const actor = actorGet(
    character.actor,
    actors
  );

  return {
    ...character,
    actor: {
      ...character.actor,
      gender: actor.gender
    }
  };
};

const charactersActorGenderAssignedGet = (
  characters,
  actors
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...memo,
        charactersActorGenderAssignedGetFn(
          character,
          actors
        )
      ];
    },
    []
  );
};

export default async (
  _characters
) => {

  let actors = actorsUniqueGet(
    _characters
  );

  actors = await actorsGenderAssignedGet(
    actors
  );

  const characters = charactersActorGenderAssignedGet(
    _characters,
    actors
  );

  return (
    characters
  );
};
