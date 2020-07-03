'use strict';

import natural from 'natural';

const wordsTokenize = (
  sentence
) => {

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

      //if (
        //word.text === 'Lightning' &&
        //(
          //_word.tag === 
          //'NNP'
        //) &&
        //(
          //word.text
            //.match(
              ///^[A-Z]/
            //)
        //) 
      //) {

        //console.log(_word, word);
      //}

      if (
        (
          _word &&
          (
            _word.tag === 
            'NNP'
          ) &&
          (
            word.tag === 
            'NNP'
          )
        ) ||
        (
          _word &&
          (
            _word.tag === 
            'NNP'
          ) &&
          (
            word.text
              .match(
                /^[A-Z]/
              )
          )
        ) ||
        (
          _word &&
          (
            word.tag === 
            'NNP'
          ) &&
          (
            _word.text
              .match(
                /^[A-Z]/
              )
          )
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
