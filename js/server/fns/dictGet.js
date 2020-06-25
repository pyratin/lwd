'use strict';

import fs from 'fs';
import path from 'path';
import {
  Trie
} from 'mnemonist';

const dictPathString = '_data/dict/words.txt';

const dictGetFn = (
  text
) => {

  return text.split(
    /\n/
  )
    .map(
      (
        line
      ) => {

        return line.trim();
      }
    )
    .filter(
      (
        word
      ) => {

        return (
          !!word
        );
      }
    )
    .map(
      (
        word
      ) => {

        return word.toLowerCase();
      }
    );
};

export default () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.readFile(
        path.join(
          process.cwd(),
          dictPathString
        ),
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
            res
          );
        }
      );
    }
  )
    .then(
      (
        text
      ) => {

        return dictGetFn(
          text
        );
      }
    )
    .then(
      (
        words
      ) => {

        return Trie.from(
          words
        );
      }
    );
};
