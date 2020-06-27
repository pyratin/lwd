'use strict';

import natural from 'natural';

const str = 'Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. The movie features an ensemble cast including Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, and others. (Source: wikipedia).';

const sentenceTokenize = (
  text
) => {

  const tokenizer = new natural.SentenceTokenizer();

  const sentences = tokenizer.tokenize(
    text
  );

  return (
    sentences
  );
};

const wordsTokenize = (
  text
) => {

  const tokenizer = new natural.TreebankWordTokenizer();

  const words = tokenizer.tokenize(
    text
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
    words
  );

  return (
    wordsTagged
  );
};

(
  async () => {

    const sentence = sentenceTokenize(
      str
    )[
      1
    ];

    const words = wordsTokenize(
      sentence
    );

    const wordsTagged = wordsTag(
      words
    );

    console.log(wordsTagged);
  }
)();
