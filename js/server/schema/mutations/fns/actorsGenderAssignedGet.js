'use strict';

import cheerio from 'cheerio';

import mediawikiFetch from './mediawikiFetch';
import sentencesTokenizedGet from './sentencesTokenizedGet';

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

  return mediawikiFetch(
    queryGet(
      encodeURIComponent(
        actorUd
      )
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
              el
            ) => {

              return $(el)
                .text();
            }
          );

        const sentenceLead = sentencesTokenizedGet(
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
              'unknown'
            );
        }
      }
    );
};

export default (
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

          return [
            ...res,
            {
              ...actor,
              gender: 'unknown'
            }
          ];
        }
      );
    },
    Promise.resolve(
      []
    )
  );
};
