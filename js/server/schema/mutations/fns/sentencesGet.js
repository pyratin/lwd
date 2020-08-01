'use strict';

import sbd from 'sbd';

import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';

const sentenceMaxLength = 100;

const sentenceNormalizeRegExp = /,\s/;

const sentenceCCReplace = (
  _sentence
) => {

  let words = wordsTokenizedGet(
    _sentence
  );

  words = wordsTaggedGet(
    words
  ); 

  words = words.reduce(
    (
      memo,
      {
        tag,
        text
      }
    ) => {

      if (
        tag === 
        'CC'
      ) {

        return [
          ...new Set(
            [
              ...memo,
              text
            ]
          )
        ];
      }

      return (
        memo
      );
    },
    []
  );

  const sentence = words.reduce(
    (
      memo,
      word
    ) => {

      return memo.replace(
        new RegExp(
          `
            \\s${
              word
            }(\\s)
          `
            .trim(),
          'g'
        ),
        `
          , ${
            word
          }$1
        `
          .trim()
      );
    },
    _sentence
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGetFn = (
  _sentence
) => {

  let sentence = sentenceCCReplace(
    _sentence
  );

  sentence = sentence.replace(
    /\swhich(\s)/g,
    ', which$1'
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGet = (
  sentences
) => {

  return sentences.reduce(
    (
      memo,
      _sentence
    ) => {

      const sentence = sentencesPreprocessedGetFn(
        _sentence
      );

      return [
        ...memo,
        sentence
      ];
    },
    []
  );
};

const sentenceNormalizedGetFn = (
  text
) => {

  const joinString = ', ';

  return text
    .split(
      sentenceNormalizeRegExp
    )
    .reduce(
      (
        memo,
        _text
      ) => {

        switch (
          true
        ) {

          case (
            !memo.length
          ) :

            return [
              _text
            ];

          case (
            (
              memo.length < 
              2
            ) &&
            (
              memo[
                0
              ]
                .length +
              _text.length +
              +joinString.length
            ) < 
            sentenceMaxLength
          ) :

            return [
              `
                ${
                  memo[
                    0
                  ]
                    .trim()
                }${
                  joinString
                }${
                  _text.trim()
                }
              `
                .trim()
            ];

          case (
            memo.length < 2
          ) :

            return [
              memo[
                0
              ],
              _text.trim()
            ];

          default:

            return [
              memo[
                0
              ],
              `
                ${
                  memo[
                    1
                  ]
                    .trim()
                }${
                  joinString
                }${
                  _text.trim()
                }
              `
                .trim()
            ];
        }
      },
      []
    );
};

const sentenceNormalizedGet = (
  text
) => {

  let texts = [
    text
  ];

  while (
    (
      (
        texts[
          texts.length - 1
        ]
          .length
      ) >
      sentenceMaxLength
    ) &&
    (
      !!texts[
        texts.length -1
      ]
        .match(
          sentenceNormalizeRegExp 
        )
    )
  ) {

    const sentenceNormalized = sentenceNormalizedGetFn(
      texts[
        texts.length - 1
      ]
    );

    texts = [
      ...texts.slice(
        0, -1
      ),
      ...sentenceNormalized
    ];
  }

  texts = texts.reduce(
    (
      memo,
      text,
      index
    ) => {

      if (
        index <
        (
          texts.length - 1
        )
      ) {

        return [
          ...memo,
          `
            ${
            text
            } ...,
          `
            .trim()
        ];
      }

      return [
        ...memo,
        text
      ];
    },
    []
  );

  return (
    texts
  );
};

const sentencesGetFn = (
  paragraph,
  paragraphIndex
) => {

  let sentences = sbd.sentences(
    paragraph
  );

  sentences = sentencesPreprocessedGet(
    sentences
  );
  
  sentences = sentences.reduce(
    (
      memo,
      text
    ) => {

      return [
        ...memo,
        ...sentenceNormalizedGet(
          text
        )
      ];
    },
    []
  )
    .map(
      (
        text,
        sentenceIndex
      ) => {

        return {
          text,
          paragraphIndex,
          sentenceIndex
        };
      }
    );

  return (
    sentences
  );
};

export default (
  paragraphs
) => {

  let sentences = paragraphs.reduce(
    (
      memo,
      _paragraph,
      paragraphIndex
    ) => {

      const paragraph = _paragraph.replace(
        /\s*\([^)]*\)(\s*)/g,
        '$1'
      );

      const _sentences = sentencesGetFn(
        paragraph,
        paragraphIndex
      );

      return [
        ...memo,
        ..._sentences
      ];
    },
    []
  );

  sentences = (
    sentences
  ) &&
    sentences.reduce(
      (
        memo,
        sentence
      ) => {

        if (
          (
            memo.length >= 
            5
          ) &&
          !memo[
            memo.length - 1
          ]
            .text
            .match(/\s...,$/)
        ) {

          return (
            memo
          );
        }

        return [
          ...memo,
          sentence
        ];
      },
      []
    );

  return (
    sentences
  );
};
