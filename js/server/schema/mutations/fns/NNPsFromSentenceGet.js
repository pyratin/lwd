'use strict';

import natural from 'natural';
import {Tag} from 'en-pos';

const wordsTokenize = (
  sentence
) => {

  const tokenizer = new natural.TreebankWordTokenizer();

  return tokenizer.tokenize(
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
};

const wordsTag = (
  words
) => {

  return words.reduce(
    (
      memo,
      word
    ) => {

      const [
        tag
      ] = new Tag(
        [
          word.text
        ]
      )
        .initial()
        .smooth()
        .tags;

      return [
        ...memo,
        {
          ...word,
          tag
        }
      ];
    },
    []
  );

};

const wordsChunk = (
  words
) => {

  const wordsChunked = words.reduce(
    (
      memo,
      word
    ) => {

      const _word = memo.slice(
        -1
      )[
        0
      ];

      if (
        _word &&
        (
          _word.tag === 
          'NNP'
        ) &&
        (
          word.tag === 
          'NNP'
        )
      ) {

        return [
          ...memo.slice(
            0, -1
          ),
          {
            ..._word,
            text: `
              ${
                _word.text
              } ${
                word.text
              }
            `
              .trim()
          }
        ];
      }

      return [
        ...memo,
        word
      ];
    },
    []
  );

  return (
    wordsChunked
  );
};

const NNPsFromSentenceGetFn = (
  words
) => {

  return words.reduce(
    (
      memo,
      word
    ) => {

      if (
        (
          word.tag === 
          'NNP'
        )
      ) {

        return [
          ...memo,
          word.text
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

export default (
  sentence
) => {

  let words = wordsTokenize(
    sentence
  );

  words = wordsTag(
    words
  );

  words = wordsChunk(
    words
  );

  words = NNPsFromSentenceGetFn(
    words
  );

  return (
    words
  );
};
