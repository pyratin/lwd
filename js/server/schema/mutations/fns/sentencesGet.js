'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';
import NNPsGet from './NNPsGet';
import parenthesisPurgedGet from './parenthesisPurgedGet';

const sentenceNormalizeRegExp = /,\s/;

const sentenceIsNormalizedGet = (
  sentence,
  sentenceMaxLength
) => {

  return (
    (
      !!sentence.match(
        sentenceNormalizeRegExp
      )
    ) &&
    (
      !!sentence.split(
        sentenceNormalizeRegExp
      )
        .reduce(
          (
            memo,
            _sentence
          ) => {

            if (
              memo &&
              (
                _sentence.length >
                sentenceMaxLength
              )
            ) {

              return (
                false
              );
            }

            return (
              memo
            );
          },
          true
        )
    )
  );
};

const wordPOSMatchConditionGet = (
  word,
  sentence,
  tagType,
  sentenceMaxLength
) => {

  if (
    sentenceIsNormalizedGet(
      sentence,
      sentenceMaxLength
    ) 
  ) {

    return (
      false
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
        ) && 
        (
          !word.text
            .match(
              /^king$/i
            )
        )
      );
  }
};

const wordPOSMatchedGet = (
  word,
  sentence,
  tagType,
  sentenceMaxLength
) => {

  const caseCondition = wordPOSMatchConditionGet(
    word,
    sentence,
    tagType,
    sentenceMaxLength
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

const wordsPosMatchedGet = (
  words,
  sentence,
  tagType,
  sentenceMaxLength
) => {

  return words.reduce(
    (
      memo,
      _word
    ) => {

      const word = wordPOSMatchedGet(
        _word,
        sentence,
        tagType,
        sentenceMaxLength
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
};

const sentenceShortenedByPOSGet = (
  _sentence,
  tagType,
  sentenceMaxLength
) => {

  if (
    sentenceIsNormalizedGet(
      _sentence,
      sentenceMaxLength
    )
  ) {

    return (
      _sentence
    );
  }

  let words = wordsTokenizedGet(
    _sentence
  );

  words = wordsTaggedGet(
    words
  ); 

  words = wordsPosMatchedGet(
    words,
    _sentence,
    tagType,
    sentenceMaxLength
  );

  const sentence = words.reduce(
    (
      memo,
      word
    ) => {

      const _distance = word.distance;

      const distanceOffset = memo.length - _sentence.length;

      const distance = _distance + distanceOffset;

      return [
        memo.slice(
          0, distance
        )
          .trim(),
        `, ${word.text} `,
        memo.slice(
          distance +
          word.text.length
        )
          .trim()
      ]
        .join(
          ''
        );
    },
    _sentence
  );

  return (
    sentence
  );
};

const NNPsSortedGet = (
  NNPs,
  sentenceMaxLength
) => {

  return NNPs.sort(
    (
      a, b
    ) => {

      const factor = sentenceMaxLength / 2;

      switch (
        true
      ) {

        case (
          Math.abs(
            a.distance -
            factor
          ) >
          Math.abs(
            b.distance -
            factor
          )
        ) :

          return 1;

        case (
          Math.abs(
            b.distance -
            factor
          ) >
          Math.abs(
            a.distance -
            factor
          )
        ) :

          return -1;
      }
    }
  );
};

const sentenceShortenedByNNPGet = (
  _sentence,
  sentenceMaxLength
) => {

  if (
    sentenceIsNormalizedGet(
      _sentence,
      sentenceMaxLength
    )
  ) {

    return (
      _sentence
    );
  }

  let NNPs = NNPsGet(
    _sentence
  );

  NNPs = NNPs.map(
    (
      NNP
    ) => {

      const wordBoundry = !!_sentence.match(
        new RegExp(
          `
            ${
              NNP.text
            }\\s
          `
            .trim()
        )
      );

      const end = !_sentence.match(
        new RegExp(
          `
            ${
              NNP.text
            }\\s[A-Z]
          `
            .trim()
        )
      );

      return {
        ...NNP,
        wordBoundry,
        end
      };
    }
  );

  NNPs = NNPs.filter(
    (
      NNP
    ) => {

      return (
        NNP.wordBoundry &&
        NNP.end
      );
    }
  );

  NNPs = NNPs.filter(
    (
      NNP
    ) => {

      return (
        _sentence.length !==
        (
          NNP.distance +
          NNP.text.length + 
          1
        )
      );
    }
  );

  const NNP = NNPsSortedGet(
    NNPs,
    sentenceMaxLength
  )?.[
    0
  ];

  const sentence = (
    NNP
  ) ?
    [
      _sentence.slice(
        0, NNP.distance
      )
        .trim(),
      ` ${NNP.text}, `,
      _sentence.slice(
        NNP.distance +
        NNP.text.length
      )
        .trim()
    ]
      .join(
        ''
      ) :
    _sentence;

  return (
    sentence
  );
};

const sentenceShortenedGetFn = (
  _sentence,
  sentenceMaxLength
) => {

  let sentence = _sentence.replace(
    /\swhich(\s)/g,
    ', which$1'
  );

  sentence = sentenceShortenedByPOSGet(
    sentence,
    'CC',
    sentenceMaxLength
  );

  sentence = sentenceShortenedByPOSGet(
    sentence,
    'VBG',
    sentenceMaxLength
  );

  sentence = sentenceShortenedByNNPGet(
    sentence,
    sentenceMaxLength
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
          (
            sentence.length >
            sentenceMaxLength
          ) &&
          (
            !sentenceIsNormalizedGet(
              sentence,
              sentenceMaxLength
            )
          )
        ) {

          sentence = sentenceShortenedGetFn(
            sentence,
            sentenceMaxLength
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

const _sentenceNormalizedGetFn = (
  sentence
) => {

  let commas = [
    ...sentence.matchAll(
      new RegExp(
        sentenceNormalizeRegExp,
        'g'
      )
    )
  ]
    .reduce(
      (
        memo,
        {
          index
        }
      ) => {

        const fragments = [
          sentence.slice(
            0, index
          ),
          sentence.slice(
            index + 1
          )
        ];

        return [
          ...memo,
          {
            distance: index,
            effect: Math.abs(
              (
                fragments[
                  0
                ]
                  .length 
              ) -
              fragments[
                1
              ]
                .length
            )
          }
        ];
      },
      []
    );

  commas = commas.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.effect >
          b.effect
        ) :

          return 1;

        case (
          b.effect >
          a.effect
        ) :

          return -1;
      }
    }
  );

  const comma = commas[
    0
  ];

  const fragments = [
    sentence.slice(
      0, comma.distance
    )
      .trim(),
    sentence.slice(
      comma.distance + 1
    )
      .trim()
  ];

  return (
    fragments
  );
};

const sentenceNormalizedGetFn = (
  text,
  sentenceMaxLength
) => {

  const joinString = ', ';

  return _sentenceNormalizedGetFn(
    text
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

