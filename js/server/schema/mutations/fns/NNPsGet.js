'use strict';

import natural from 'natural';

import wordsTokenizedGet from './wordsTokenizedGet';

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
    words.map(
      (
        word
      ) => {

        return (
          word.text
        );
      }
    )
  )
    .taggedWords
    .reduce(
      (
        memo,
        wordtagged,
        index
      ) => {

        return [
          ...memo,
          {
            ...wordtagged,
            ...words[
              index
            ]
          }
        ];
      },
      []
    );

  return (
    wordsTagged
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

      switch (
        true
      ) {

        case (
          !_word
        ) :

          return [
            ...memo,
            word
          ];

        case (
          (
            _word.tag === 
            'NNP'
          ) &&
          (
            word.tag === 
            'NNP'
          )
        ) :
        case (
          (
            _word.tag === 
            'NNP'
          ) &&
          (
            !!word.text
              .match(
                /^[A-Z]/
              )
          )
        ) :
        case (
          (
            word.tag === 
            'NNP'
          ) &&
          (
            !!_word.text
              .match(
                /^[A-Z]/
              )
          ) &&
          (
            !!_word.index
          )
        ) :
        case (
          (
            _word.tag === 
            'NNP'
          ) &&
          (
            !!word.text
              .match(
                /^["]/
              )
          )
        ) :

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
                .trim(),
              tag: 'NNP'
            }
          ];

        case (
          word.tag ===
          'FW'
        ) :

          return [
            ...memo,
            {
              ...word,
              tag: 'NNP'
            }
          ];

        default:

          return [
            ...memo,
            word
          ];
      }
    },
    []
  );

  return (
    wordsChunked
  );
};

const doublequotesHandledGet = (
  words
) => {

  return words.reduce(
    (
      memo,
      word
    ) => {

      const regExp = /"\s(\w+)\s"/;

      const match = word.text
        .match(
          regExp
        );

      if (
        match
      ) {

        const text = word.text
          .replace(
            `
              " ${
                match[
                  1
                ]
              } "
            `
              .trim(),
            `
              "${
                match[
                  1
                ]
              }"
            `
              .trim()
          );

        return [
          ...memo,
          {
            ...word,
            text
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
};

const NNPsGetFn = (
  words
) => {

  return words.reduce(
    (
      memo,
      word
    ) => {

      switch (
        true
      ) {

        case (
          word.tag === 
          'NNP'
        ) :

          return [
            ...memo,
            word.text
          ];

        default :

          return (
            memo
          );
      }
    },
    []
  );
};

export default (
  sentence
) => {

  let words = wordsTokenizedGet(
    sentence
  );

  words = wordsTag(
    words
  );

  words = wordsChunk(
    words
  );

  words = doublequotesHandledGet(
    words
  );

  words = NNPsGetFn(
    words
  );

  return (
    words
  );
};
