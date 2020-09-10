'use strict';

import cheerio from 'cheerio';

import plotNNPsGet from './plotNNPsGet';
import NNPsGet from './NNPsGet';
import NNPCrossMatchGet from './NNPCrossMatchGet';
import sentencesTokenizedGet
  from './sentencesTokenizedGet';

const actorNNPsGet = (
  castLines
) => {

  const NNPs = castLines.reduce(
    (
      memo,
      castLine
    ) => {

      const NNPs = NNPsGet(
        castLine,
        true
      );

      const NNP = NNPs.find(
        (
          {
            distance
          }
        ) => {

          return (
            distance ===
            0
          );
        }
      );

      if (
        NNP
      ) {

        return [
          ...memo,
          NNP
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    NNPs
  );
};

const actorsUdAssignedGet = (
  _actors,
  castHtml
) => {

  const actors = _actors.reduce(
    (
      memo,
      actor
    ) => {

      const hrefCatchString = '[^"]*?';

      const regExpString = `
      <a href="/wiki/(${
        hrefCatchString
      })" [^>]*?>${
          actor.text
        }</a>
      `
        .trim();

      const regExp = new RegExp(
        regExpString,
      );

      const match = castHtml.match(
        regExp
      );

      if (
        match
      ) {

        return [
          ...memo,
          {
            ...actor,
            ud: match[1]
          }
        ];
      }

      return [
        ...memo,
        {
          ...actor,
          ud: null
        }
      ];
    },
    []
  );

  return (
    actors
  );
};

const actorsFilteredGetFn = (
  plotCharacters,
  actor
) => {

  return plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      const match = NNPCrossMatchGet(
        plotCharacter.text,
        actor.text,
        false
      );

      if (
        !memo &&
        match
      ) {

        return (
          match
        );
      }

      return (
        memo
      );
    },
    null
  );
};

const actorsFilteredGet = (
  _actors,
  plot
) => {

  const plotCharacters = plotNNPsGet(
    plot
  );

  const actors = _actors.reduce(
    (
      memo,
      actor
    ) => {

      const match = actorsFilteredGetFn(
        plotCharacters,
        actor
      );

      if (
        match &&
        !actor.ud
      ) {

        return (
          memo
        );
      }

      return [
        ...memo,
        actor
      ];
    },
    []
  );

  return (
    actors
  );
};

const actorsCleanedGet = (
  actors
) => {

  return actors.map(
    (
      actor
    ) => {

      delete actor.index;
      delete actor.distance;
      delete actor.tokenIndex;

      return (
        actor
      );
    }
  );
};

const actorRegExpGet = (
  actorText
) => {

  return new RegExp(
    `
      ^${
        actorText
      }
    `
      .trim(),
    'm'
  );
};

const castGetFn = (
  actors,
  castLines,
  castRoleLimit
) => {

  const castText = castLines.join(
    '\n'
  );

  const cast = actors.reduce(
    (
      memo,
      actor,
      index
    ) => {

      let role = castText.split(
        actorRegExpGet(
          actor.text
        )
      )?.[
        1
      ];

      if (
        (
          actors.length >
          (
            index + 1
          )
        ) &&
        role
      ) {

        role = role.split(
          actorRegExpGet(
            actors[
              index + 1
            ]
              .text
          )
        )?.[
          0
        ];
      }

      role = (role) ?
        role.replace(
          /\n/g,
          ' '
        ) :
        '';

      role = (
        castRoleLimit
      ) ?
        sentencesTokenizedGet(
          role
        )[
          0
        ] :
        role;

      role = (
        castRoleLimit
      ) ?
        role.split(
          /[:,]/
        )[
          0
        ] :
        role;

      role = `
        ${
          actor.text
        } ${
          role.trim()
        }
      `
        .trim();

      if (
        role
      ) {

        return [
          ...memo,
          {
            actor,
            role
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    cast
  );
};

export default (
  _castText,
  plot,
  castRoleLimit
) => {

  if (
    !_castText ||
    !plot
  ) {

    return (
      null
    );
  }

  const $ = cheerio.load(
    _castText
  );

  const castLines = $(
    'li'
  )
    .toArray()
    .map(
      (
        _el
      ) => {

        const el = $(_el)
          .find('span.mw-reflink-text')
          .remove()
          .end();

        return $(el)
          .text();
      }
    );

  let actors = actorNNPsGet(
    castLines
  );

  actors = actorsUdAssignedGet(
    actors,
    _castText
  );

  actors = actorsFilteredGet(
    actors,
    plot
  );

  actors = actorsCleanedGet(
    actors
  );

  let cast = castGetFn(
    actors,
    castLines,
    castRoleLimit
  );

  return (
    cast
  );
};

