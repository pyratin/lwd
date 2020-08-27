'use strict';

import sentencesTokenizedGet from './sentencesTokenizedGet';
import NNPsGet from './NNPsGet';
import NNPsUniqueGet from './NNPsUniqueGet';

const sentenceNNPsGet = (
  sentence,
  sentenceIndex,
  castIndex
) => {

  return NNPsGet(
    sentence
  )
    .map(
      (
        NNP
      ) => {

        const possessive = !!sentence
          .match(
            new RegExp(
              `
                ${
                  NNP.text
                }'s
              `
                .trim()
            )
          );

        return {
          ...NNP,
          possessive,
          sentenceIndex,
          castIndex
        };
      }
    );
};

const _castNNPsGet = (
  _cast,
  castIndex
) => {

  return sentencesTokenizedGet(
    _cast.role
  )
    .reduce(
      (
        memo,
        sentence,
        sentenceIndex
      ) => {

        const NNPs = sentenceNNPsGet(
          sentence,
          sentenceIndex,
          castIndex
        );

        return [
          ...memo,
          ...NNPs
        ];
      },
      []
    );
};

export default (
  cast,
  uniqueFlag = false
) => {
  
  let castNNPs = cast.reduce(
    (
      memo,
      _cast,
      castIndex
    ) => {

      const NNPs = _castNNPsGet(
        _cast,
        castIndex
      );

      return [
        ...memo,
        ...NNPs
      ];
    },
    []
  );

  if (
    uniqueFlag
  ) {

    castNNPs = NNPsUniqueGet(
      castNNPs
    );
  }

  castNNPs = castNNPs.map(
    (
      castNNP,
      index
    ) => {
  
      return {
        ...castNNP,
        index
      };
    }
  );

  return (
    castNNPs
  );
};
