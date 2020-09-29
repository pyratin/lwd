'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';
import NNPsGet from './NNPsGet';
import parenthesisPurgedGet from './parenthesisPurgedGet';

const sentenceNormalizeRegExp = /,\s/;

const sentencesParenthesisPurgedGet = (
  sentences 
) => {

  return sentences.map(
    (
      sentence
    ) => {

      return parenthesisPurgedGet(
        sentence
      );
    }
  );
};

const sentenceIsNormalizableGet = (
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
    sentenceIsNormalizableGet(
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
    sentenceIsNormalizableGet(
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

  words = words.map(
    (
      word
    ) => {

      return {
        ...word,
        redundant: (
          !!_sentence.slice(
            0, word.distance
          )
            .trim()
            .match(
              /,$/
            )
        )
      };
    }
  );

  words = words.filter(
    (
      word
    ) => {

      return (
        !word.redundant
      );
    }
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
    sentenceIsNormalizableGet(
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

const sentenceProcessedGet = (
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

const fragmentWordCountGet = (
  fragment
) => {

  if (
    !fragment
  ) {

    return (
      null
    );
  }

  return fragment.split(
    /\s/
  )
    .length;
};

const fragmentsShortHandledGetFn = (
  index,
  memo,
  fragments
) => {

  const fragment = fragments[
    index
  ];
    
  const fragmentWordCount = fragmentWordCountGet(
    fragment
  );

  const fragmentPrevious = (
    index
  ) &&
    fragments[
      index - 1
    ];

  const fragmentPreviousWordCount = fragmentWordCountGet(
    fragmentPrevious
  );

  const fragmentNext = (
    fragments.length >
    index + 1
  ) &&
    fragments[
      index + 1
    ];

  const fragmentNextWordCount = fragmentWordCountGet(
    fragmentNext
  );

  switch (
    true
  ) {

    case (
      fragmentPrevious &&
      (
        fragmentPreviousWordCount <=
        3
      ) &&
      (
        fragmentWordCount <=
        3
      )
    ) :
    case (
      fragmentPrevious &&
      fragmentNext &&
      (
        fragmentPreviousWordCount >
        3
      ) &&
      (
        fragmentWordCount <=
        3
      ) &&
      (
        fragmentNextWordCount >
        3
      )
    ) :

      return [
        ...memo.slice(
          0,
          memo.length - 1
        ),
        `
          ${
            memo[
              memo.length - 1
            ]
          }, ${
            fragment
          }
        `
          .trim()
      ];

    default :

      return [
        ...memo,
        fragment
      ];
  }
};

const fragmentsShortHandledGet = (
  _fragments
) => {

  return _fragments.reduce(
    (
      memo,
      fragment,
      index
    ) => {

      const fragments = fragmentsShortHandledGetFn(
        index,
        memo,
        _fragments
      );

      return (
        fragments
      );
    },
    []
  );
};

const sentencesNormalizedGetFn = (
  _sentence,
  sentenceMaxLength
) => {

  const sentence = (
    !sentenceIsNormalizableGet(
      _sentence,
      sentenceMaxLength
    )
  ) ?
    sentenceProcessedGet(
      _sentence,
      sentenceMaxLength
    ) :
    _sentence;

  let fragments = sentence.split(
    sentenceNormalizeRegExp
  );

  fragments = fragmentsShortHandledGet(
    fragments
  );

  fragments = fragments.reduce(
    (
      memo,
      fragment
    ) => {

      const fragmentPrevious = memo[
        memo.length - 1
      ];

      switch (
        true
      ) {

        case (
          !!fragmentPrevious &&
          (
            fragmentPrevious.length +
            fragment.length
          ) <
          sentenceMaxLength
        ) :

          return [
            ...memo.slice(
              0, -1
            ),
            `
              ${
                fragmentPrevious
              }, ${
                fragment
              }
            `
              .trim()
          ];

        case (
          !!fragmentPrevious
        ) :

          return [
            ...memo.slice(
              0, -1
            ),
            `
              ${
                fragmentPrevious
              } ...,
            `
              .trim(),
            fragment
          ];

        default :

          return [
            ...memo,
            fragment
          ];
      }
    },
    []
  );

  return (
    fragments
  );
};

const sentencesNormalizedGet = (
  sentences,
  sentenceMaxLength
) => {

  return sentences.reduce(
    (
      memo,
      _sentence
    ) => {

      const sentence = sentencesNormalizedGetFn(
        _sentence,
        sentenceMaxLength
      );

      return [
        ...memo,
        ...sentence
      ];
    },
    []
  );
};

export default (
  paragraph,
  sentenceMaxLength
) => {

  let sentences = sentencesTokenizedGet(
    paragraph
  );

  sentences = sentencesParenthesisPurgedGet(
    sentences
  );

  sentences = sentencesNormalizedGet(
    sentences,
    sentenceMaxLength
  );

  return (
    sentences
  );
};
