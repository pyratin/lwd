'use strict';

import NNPsGet from './NNPsGet';
import NNPsUniqueGet from './NNPsUniqueGet';

export default (
  plot
) => {

  let plotNNPs = plot.reduce(
    (
      memo,
      sentence
    ) => {

      return [
        ...new Set(
          [
            ...memo,
            ...NNPsGet(
              sentence.text,
              false
            )
              .map(
                (
                  NNP
                ) => {

                  return {
                    ...NNP,
                    paragraphIndex: sentence.paragraphIndex,
                    sentenceIndex: sentence.sentenceIndex
                  };
                }
              )
          ]
        )
      ];
    },
    []
  );

  plotNNPs = NNPsUniqueGet(
    plotNNPs
  );

  plotNNPs = plotNNPs.map(
    (
      plotNNP,
      index
    ) => {

      return {
        ...plotNNP,
        index
      };
    }
  );

  return (
    plotNNPs
  );
};
