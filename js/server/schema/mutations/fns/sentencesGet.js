'use strict';

import sbd from 'sbd';

const sentenceMaxLength = 100;

const sentenceNormalizeRegExp = /,\s/;

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
      paragraph,
      paragraphIndex
    ) => {

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
