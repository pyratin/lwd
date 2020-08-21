'use strict';

import {
  exec
} from 'child_process';

import cardsBase64AssignedGet from 
  './cardsBase64AssignedGet';
import cardsRenderedGet from './cardsRenderedGet';
import splashGet from './splashGet';
import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

const charactersFromCardsGet = (
  cards
) => {

  return cards.reduce(
    (
      memo,
      card
    ) => {

      const exists = memo.find(
        (
          _memo
        ) => {

          const characterText = card?.character?.text;

          return (
            (
              characterText
            ) &&
            (
              (
                characterText
                  .match(
                    _memo.text
                  )
              ) ||
              (
                _memo.text
                  .match(
                    characterText
                  )
              )
            )
          );
        }
      );

      if (
        card?.character?.text &&
        !exists
      ) {

        return [
          ...memo,
          card.character
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const charactersDualRoleIndexAssignedGet = (
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

      const dualRoleIndex = memo.findIndex(
        (
          _memo
        ) => {

          return (
            (
              _memo.dualRoleIndex === 
              -1
            ) &&
            (
              _memo.actor.text ===
              _character.actor.text
            )
          );
        }
      );

      if (
        dualRoleIndex >=
        0
      ) {

        return [
          ...memo,
          {
            ..._character,
            dualRoleIndex
          }
        ];
      }

      return [
        ...memo,
        {
          ..._character,
          dualRoleIndex: -1
        }
      ];
    },
    []
  );

  return (
    characters
  );
};

const cardsDualRoleIndexAssignedGet = (
  _cards,
  characters
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
    ) => {

      const character = characters.find(
        (
          character
        ) => {

          return (
            character.text ===
            _card?.character?.text
          );
        }
      );

      if (
        character
      ) {

        return [
          ...memo,
          {
            ..._card,
            dualRoleIndex: character.dualRoleIndex
          }
        ];
      }

      return [
        ...memo,
        _card
      ];
    },
    []
  );

  return (
    cards
  );
};

const gifGetFn = (
  miffStreamsConcated
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert -loop 0 -delay 1000 miff:- gif:-',
        {
          encoding: 'base64'
        },
        (
          error,
          stdout
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          return resolve(
            stdout
          );
        }
      );

      miffStreamsConcated.pipe(
        proc.stdin
      );
    }
  );
};

const gifOptimizedGet = (
  gif
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const buffer = new Buffer.from(
        gif,
        'base64'
      );

      const proc = exec(
        'convert gif:- -coalesce -fuzz 5% -layers optimize gif:-',
        {
          encoding: 'base64'
        },
        (
          error,
          stdout
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          return resolve(
            `
              data:image/gif;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      proc.stdin.write(
        buffer
      );

      proc.stdin.end();
    }
  );
};

const gifGet = async (
  splash,
  base64s
) => {

  const input = (
    splash
  ) ?
    [
      splash,
      ...base64s
    ] :
    base64s;

  let miffStreamsConcated = await base64MiffStreamsConcatedGet(
    input
  );

  let gif = await gifGetFn(
    miffStreamsConcated
  );

  gif = await gifOptimizedGet(
    gif
  );

  return (
    gif
  );
};

export default async (
  movieTitle,
  moviePoster,
  _cards,
  db
) => {

  let cards = await cardsBase64AssignedGet(
    _cards,
    db
  );

  let characters = charactersFromCardsGet(
    cards
  );

  characters = charactersDualRoleIndexAssignedGet(
    characters
  );

  cards = cardsDualRoleIndexAssignedGet(
    cards,
    characters
  );

  const cardBase64s = await cardsRenderedGet(
    cards
  );

  const splash = await splashGet(
    movieTitle,
    moviePoster,
    characters,
    cards
  );

  const gif = await gifGet(
    splash,
    cardBase64s
  );

  return (
    gif
  );
};
