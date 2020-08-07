'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';

const sentenceMaxLength = 100;

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
  _sentence
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

const sentenceActorTextsRemove = (
  sentence,
  cast
) => {

  return cast.reduce(
    (
      memo,
      _cast
    ) => {

      const regExp = new RegExp(
        `
          \\s(\\(${
            _cast.actor.text
          }\\))
        `
          .trim(),
        'g'
      );

      return memo.replace(
        regExp,
        ''
      );
    },
    sentence
  );
};

const sentenceParenthesisHandle = (
  _sentence,
  cast
) => {

  let sentence = sentenceActorTextsRemove(
    _sentence,
    cast
  );

  sentence = sentence.replace(
    /\s*\([^)]*\)(\s*)/g,
    '$1'
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGetFn = (
  _sentence,
  cast
) => {

  let sentence = sentenceShortenedGet(
    _sentence
  );

  sentence = sentenceParenthesisHandle(
    sentence,
    cast
  );

  return (
    sentence
  );
};

const sentencesPreprocessedGet = (
  sentences,
  cast
) => {

  return sentences.reduce(
    (
      memo,
      _sentence
    ) => {

      const sentence = sentencesPreprocessedGetFn(
        _sentence,
        cast
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
  paragraphIndex,
  cast
) => {

  let sentences = sentencesTokenizedGet(
    paragraph
  );

  sentences = sentencesPreprocessedGet(
    sentences,
    cast
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
  paragraphs,
  cast
) => {

  let sentences = paragraphs.reduce(
    (
      memo,
      paragraph,
      paragraphIndex
    ) => {

      const _sentences = sentencesGetFn(
        paragraph,
        paragraphIndex,
        cast
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
            3
          ) &&
          (
            !memo[
              memo.length - 1
            ]?.text
              .match(/\s...,$/)
          ) &&
          (
            (
              memo[
                memo.length - 1
              ]?.paragraphIndex !==
              sentence.paragraphIndex
            ) ||
            (
              memo.length >=
              6
            )
          )
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
