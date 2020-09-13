'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';
import parenthesisPurgedGet from './parenthesisPurgedGet';

const sentenceNormalizeRegExp = /,\s/;

const sentenceIsNormalizedGet = (
  sentence
) => {

  return (
    !!sentence.match(
      sentenceNormalizeRegExp
    )
  );
};

const wordPOSMatchConditionGet = (
  word,
  sentence,
  tagType
) => {

  if (
    sentenceIsNormalizedGet(
      sentence
    ) 
  ) {

    return (
      sentence
    );
  }

  switch (
    tagType
  ) {

    case (
      'CC'
    ) :

      return (
        word.tag === 
        'CC'
      );

    case (
      'VBG'
    ) :

      return (
        (
          word.tag === 
          'VBG'
        ) &&
        (
          !!word.text
            .match(
              /ing$/
            )
        )
      );
  }
};

const wordPOSMatchedGet = (
  word,
  sentence,
  tagType
) => {

  const caseCondition = wordPOSMatchConditionGet(
    word,
    sentence,
    tagType
  );

  switch (
    true
  ) {

    case (
      caseCondition
    ) :

      return (
        word
      );

    default:

      return (
        null
      );
  }
};

const sentenceShortenedByPOSGet = (
  _sentence,
  tagType
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
      _word
    ) => {

      const word = wordPOSMatchedGet(
        _word,
        _sentence,
        tagType
      );

      if (
        word
      ) {

        return [
          ...memo,
          word
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
              word.text
            }(\\s)
          `
            .trim(),
          'g'
        ),
        `
          , ${
            word.text
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

  let sentence = sentenceShortenedByPOSGet(
    _sentence,
    'CC'
  );

  sentence = sentenceShortenedByPOSGet(
    sentence,
    'VBG'
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
    sentenceNormalizeRegExp
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

