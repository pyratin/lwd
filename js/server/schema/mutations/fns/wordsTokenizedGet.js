'use strict';

import natural from 'natural';
import escapeStringRegexp from 'escape-string-regexp';

export default (
  _sentence
) => {

  const sentence = _sentence
    .replace(
      /(\S)\/(\S)/g,
      '$1 / $2'
    );

  const tokenizer = new natural.TreebankWordTokenizer();

  let words = tokenizer.tokenize(
    sentence
  )
    .reduce(
      (
        memo,
        word,
        index
      ) => {

        return [
          ...memo,
          {
            text: word,
            index
          }
        ];
      },
      []
    );

  words = words.reduce(
    (
      memo,
      word
    ) => {

      let regExpString = memo.reduce(
        (
          regExpStringMemo,
          {
            text
          }
        ) => {

          return `
            ${
              regExpStringMemo
            }\\s*${
              escapeStringRegexp(
                text
              )
            }
          `
            .trim();
        },
        ''
      );

      regExpString = `
        ^${
          regExpString
        }\\s*
      `
        .trim();

      const regExp = new RegExp(
        regExpString
      );

      const match = _sentence.match(
        regExp
      );

      return [
        ...memo,
        {
          ...word,
          distance: match?.[
            0
          ]
            .length
        }
      ];
    },
    []
  );

  return (
    words
  );
};

