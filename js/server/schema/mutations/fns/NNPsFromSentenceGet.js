'use strict';

import natural from 'natural';

const wordsTokenize = (
  sentence
) => {

  const tokenizer = new natural.TreebankWordTokenizer(
    sentence
  );

  return tokenizer.tokenize(
    sentence
  );
};

const wordsTag = (
  words
) => {

  const language = 'EN';
  const defaultCategory = 'N';
  const defaultCategoryCapitalized = 'NNP';

  const lexicon = new natural.Lexicon(
    language,
    defaultCategory,
    defaultCategoryCapitalized
  );

  const ruleSet = new natural.RuleSet(
    language
  );

  const tagger = new natural.BrillPOSTagger(
    lexicon,
    ruleSet
  );

  const wordsTagged = tagger.tag(
    words
  )
    .taggedWords;

  return (
    wordsTagged
  );
};

const wordsChunk = (
  wordsTagged
) => {

  const wordsChunked = wordsTagged.reduce(
    (
      memo,
      wordTagged
    ) => {

      const _wordTagged = memo.slice(
        -1
      )[
        0
      ];

      if (
        _wordTagged &&
        (
          _wordTagged.tag === 
          'NNP'
        ) &&
        (
          wordTagged.tag === 
          'NNP'
        )
      ) {

        return [
          ...memo.slice(
            0, -1
          ),
          {
            ..._wordTagged,
            token: `
              ${
                _wordTagged.token
              } ${
                wordTagged.token
              }
            `
              .trim()
          }
        ];
      }

      return [
        ...memo,
        wordTagged
      ];
    },
    []
  );

  return (
    wordsChunked
  );
};

const NNPsGetFn = (
  wordsChunked
) => {

  return wordsChunked.reduce(
    (
      memo,
      wordChunked
    ) => {

      if (
        (
          wordChunked.tag === 
          'NNP'
        ) ||
        (
          wordChunked.tag ===
          'FW'
        )
      ) {

        return [
          ...memo,
          wordChunked.token
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

  const words = wordsTokenize(
    sentence
  );

  const wordsTagged = wordsTag(
    words
  );

  const wordsChunked = wordsChunk(
    wordsTagged
  );

  const NNPs = NNPsGetFn(
    wordsChunked
  );

  return (
    NNPs
  );
};
