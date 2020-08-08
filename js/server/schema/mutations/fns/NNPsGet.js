'use strict';

import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';

const wordsChunk = (
  words,
  attachIndexZeroOverride
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
            !!_word.index ||
            !!attachIndexZeroOverride
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
            word
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
  sentence,
  attachIndexZeroOverride = false
) => {

  let words = wordsTokenizedGet(
    sentence
  );

  words = wordsTaggedGet(
    words
  );

  words = wordsChunk(
    words,
    attachIndexZeroOverride
  );

  words = NNPsGetFn(
    words
  );

  return (
    words
  );
};
