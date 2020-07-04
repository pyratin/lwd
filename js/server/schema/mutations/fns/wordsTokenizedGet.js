'use strict';

import natural from 'natural';

export default (
  _sentence
) => {

  const sentence = _sentence
    .replace(
      /\//g,
      ' / '
    );

  const tokenizer = new natural.TreebankWordTokenizer();

  const words = tokenizer.tokenize(
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

  return (
    words
  );
};

