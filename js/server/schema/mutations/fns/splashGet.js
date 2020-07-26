'use strict';

import fs from 'fs';
import path from 'path';
import nodeFetch from 'node-fetch';
import {
  exec
} from 'child_process';

import {
  outputResGet
} from '~/js/server/fns/variable';
import base64TextCompositedGet from './base64TextCompositedGet';
import base64MiffStreamsConcatedGet from 
  './base64MiffStreamsConcatedGet';

const charactersGet = (
  characters,
  cards
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      const card = cards.find(
        (
          card
        ) => {

          return (
            card.actorUd &&
            character.actor.ud &&
            (
              card.actorUd ===
              character.actor.ud
            )
          );
        }
      );

      if (
        card
      ) {

        return [
          ...memo,
          {
            ...character,
            base64: card.base64
          }
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const base64BlankGet = () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        path.join(
          process.cwd(),
          'media/blank.jpeg'
        ),
        'base64',
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
            `
              data:image/jpeg;base64,${
                res
              }
            `
              .trim()
          );
        }
      );
    }
  );
};

const moviePosterBase64GetFn = (
  buffer
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const res = outputResGet();

      const proc = exec(
        `
          convert 
          \\(
            -size ${
              res
            }x${
              res
            }
            xc:"#000" 
          \\)
          \\(
            jpeg:-
            -resize ${
              res
            }x${
              res
            }
          \\)
          -gravity center
          -compose blend
          -define compose:args=50
          -composite
          jpeg:-
        `
          .split(
            /\s/
          )
          .reduce(
            (
              memo,
              _command
            ) => {

              return `
                ${
                  memo
                } ${
                  _command
                }
              `
                .trim();
            },
            ''
          ),
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
              data:image/jpeg;base64,${
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

const moviePosterBase64Get = (
  moviePoster
) => {

  if (
    !moviePoster
  ) {

    return base64BlankGet();
  }

  return nodeFetch(
    moviePoster
  )
    .then(
      (
        res
      ) => {

        return res.buffer();
      }
    )
    .then(
      (
        buffer
      ) => {

        return moviePosterBase64GetFn(
          buffer
        );
      }
    );
};

const characterBase64sGet = (
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

          return base64TextCompositedGet(
            character.base64,
            `
              ${
                character.text
              }
            `
              .trim(),
            outputResGet() / 3.5,
            50,
            10
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

const charactersCompositedBase64Get = (
  characterStreamsConcated,
  direction = 'row'
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        `
          convert 
          \\(
            miff:-
            -bordercolor transparent
            -border ${
              (direction === 'row') ?
                '2x0' : '0x2'
            }
            -gravity south
            -background none
            ${
              (direction === 'row') ?
                '+' : '-'
            }append
          \\)
          png:-
        `
          .split(
            /\s/
          )
          .reduce(
            (
              memo,
              _command
            ) => {

              return `
                ${
                  memo
                } ${
                  _command
                }
              `
                .trim();
            },
            ''
          ),
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
              data:image/png;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      characterStreamsConcated.pipe(
        proc.stdin
      );
    }
  );
};

const charactersMontageGet = async (
  characters
) => {

  if (
    !characters.length
  ) {

    return Promise.resolve(
      null
    );
  }

  const characterBase64s = await characterBase64sGet(
    characters
  );

  const characterRows = characterBase64s.reduce(
    (
      memo,
      characterBase64,
      index
    ) => {

      if (
        index % 2
      ) {

        return [
          ...memo.slice(
            0, -1
          ),
          [
            ...memo[
              memo.length - 1
            ], 
            characterBase64
          ]
        ];
      }

      return [
        ...memo,
        [
          characterBase64
        ]
      ];
    },
    []
  );

  const characterRowStreams = await characterRows.reduce(
    (
      memo,
      characterBase64Row
    ) => {

      return memo.then(
        (
          res
        ) => {

          return base64MiffStreamsConcatedGet(
            characterBase64Row
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

  const characterRowCompositedBase64s = 
    await characterRowStreams.reduce(
      (
        memo,
        characterRowStream
      ) => {

        return memo.then(
          (
            res
          ) => {

            return charactersCompositedBase64Get(
              characterRowStream,
              'row'
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

  const characterRowCompositedStreams = 
    await base64MiffStreamsConcatedGet(
      characterRowCompositedBase64s
    );

  const charactersCompositedBase64 = 
    await charactersCompositedBase64Get(
      characterRowCompositedStreams,
      'column'
    );

  return (
    charactersCompositedBase64
  );
};

const finalCompositedGetFn = (
  finalCompositeMiffStreamsConcated
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const proc = exec(
        'convert miff:- -gravity north -composite jpeg:-',
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
              data:image/jpeg;base64,${
                stdout
              }
            `
              .trim()
          );
        }
      );

      finalCompositeMiffStreamsConcated.pipe(
        proc.stdin
      );
    }
  );
};

const finalCompositedGet = async (
  movieTitle,
  moviePosterBase64,
  charactersMontageBase64
) => {

  const res = outputResGet();

  const pointsize = 20;

  const border = 10;

  if (
    !charactersMontageBase64
  ) {

    return base64TextCompositedGet(
      moviePosterBase64,
      movieTitle,
      res,
      pointsize,
      border
    );
  }

  const finalCompositeMiffStreamsConcated = 
    await base64MiffStreamsConcatedGet(
      [
        moviePosterBase64,
        charactersMontageBase64
      ]
    );

  let splash = await finalCompositedGetFn(
    finalCompositeMiffStreamsConcated
  );

  splash = await base64TextCompositedGet(
    splash,
    movieTitle,
    res,
    pointsize,
    border
  );

  return (
    splash
  );
};

export default async (
  movieTitle,
  moviePoster,
  _characters,
  cards
) => {

  const characters = charactersGet(
    _characters,
    cards
  );

  const moviePosterBase64 = await moviePosterBase64Get(
    moviePoster
  );

  const charactersMontageBase64 = 
    await charactersMontageGet(
      characters
    );

  const splash = await finalCompositedGet(
    movieTitle,
    moviePosterBase64,
    charactersMontageBase64
  );

  return (
    splash
  );
};
