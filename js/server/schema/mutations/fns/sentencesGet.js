'use strict';

import wordsTokenizedGet from './wordsTokenizedGet';
import wordsTaggedGet from './wordsTaggedGet';
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

const sentencesColonsReplacedGet = (
  sentences
) => {

  return sentences.map(
    (
      sentence
    ) => {

      return sentence.replace(
        /(;|:)+\s/g,
        ', '
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

  let matches = _sentence.matchAll(
    /(?<![,]\s)(?<=\s)[A-Z]+[a-z]*(?=\s)(?!\s[A-Z0-9])/g
  );

  let NNPs = [
    ...matches
  ]
    .map(
      (
        match
      ) => {

        return {
          text: match[
            0
          ],
          distance: match.index
        };
      }
    );

  let fragments = NNPs.reduce(
    (
      memo,
      NNP,
      index
    ) => {

      const _NNP = (
        index
      ) ?
        NNPs[
          index - 
          1
        ] :
        null;

      const sliceStart = (
        _NNP
      ) ?
        (
          _NNP.distance +
          _NNP.text
            .length
        ) :
        0;

      const sliceEnd = (
        NNP.distance +
          NNP.text
            .length
      );

      const fragment = _sentence.slice(
        sliceStart,
        sliceEnd
      );

      const rest = _sentence.slice(
        sliceEnd
      );

      return [
        ...memo.slice(
          0, -1
        ),
        fragment.trim(),
        rest
      ];
    },
    []
  );

  fragments = fragments.reduce(
    (
      memo,
      fragment,
      index
    ) => {

      const fragmentPrevious = (
        index
      ) ?
        fragments[
          index - 1
        ] :
        '';

      const fragmentPreviousLength = (
        fragmentPrevious
      ) ?
        fragmentPrevious.length :
        0;

      if (
        (
          fragmentPreviousLength +
          fragment.length
        ) <
        sentenceMaxLength
      ) {

        return [
          ...memo.slice(
            0, -1
          ),
          `
            ${
              fragmentPrevious
            } ${
              fragment
            }
          `
            .trim()
        ];
      }

      return [
        ...memo,
        fragment
      ];
    },
    []
  );

  const sentence = fragments.join(
    ', '
  );

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
  _sentences,
  sentenceMaxLength
) => {

  let sentences = sentencesParenthesisPurgedGet(
    _sentences
  );

  sentences = sentencesColonsReplacedGet(
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
