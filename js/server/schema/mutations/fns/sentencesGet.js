'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';
import parenthesisPurgedGet from './parenthesisPurgedGet';

const sentenceNormalizeRegExp = /,\s/;

const _sentenceShortenedGetFn = (
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
        (
          tag === 
          'CC'
        ) ||
        (
          (
            tag === 
            'VBG'
          ) &&
          (
            text.match(
              /ing$/
            )
          )
        )
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
            ,*\\s${
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

const sentenceShortenedGetFn = (
  _sentence
) => {

  let sentence = _sentenceShortenedGetFn(
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

const sentenceShortenedGet = (
  _sentence,
  sentenceMaxLength
) => {

  const sentence = _sentence.split(
    /,/g
  )
    .reduce(
      (
        memo,
        __sentence
      ) => {

        let sentence = __sentence.trim();

        if (
          sentence.length >
          sentenceMaxLength
        ) {

          sentence = sentenceShortenedGetFn(
            sentence
          );

          return [
            ...memo,
            sentence
          ];
        }

        return [
          ...memo,
          sentence
        ];
      },
      []
    )
    .join(
      ', '
    );

  return (
    sentence
  );
};

const sentenceParenthesisHandle = (
  _sentence
) => {

  let sentence = parenthesisPurgedGet(
    _sentence
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGetFn = (
  _sentence,
  sentenceMaxLength
) => {

  let sentence = sentenceShortenedGet(
    _sentence,
    sentenceMaxLength
  );

  sentence = sentenceParenthesisHandle(
    sentence
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGet = (
  sentences,
  sentenceMaxLength
) => {

  return sentences.reduce(
    (
      memo,
      _sentence
    ) => {

      const sentence = sentencesPreprocessedGetFn(
        _sentence,
        sentenceMaxLength
      );

      if (
        sentence.trim()
      ) {

        return [
          ...memo,
          sentence
        ];
      }

      return (
        memo
      );
    },
    []
  );
};

const sentenceNormalizedGetFn = (
  text,
  sentenceMaxLength
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
  text,
  sentenceMaxLength
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
      ],
      sentenceMaxLength
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

export default (
  paragraph,
  sentenceMaxLength
) => {

  let sentences = sentencesTokenizedGet(
    paragraph
  );

  sentences = sentencesPreprocessedGet(
    sentences,
    sentenceMaxLength
  );
  
  sentences = sentences.reduce(
    (
      memo,
      text
    ) => {

      return [
        ...memo,
        ...sentenceNormalizedGet(
          text,
          sentenceMaxLength
        )
      ];
    },
    []
  );

  return (
    sentences
  );
};

