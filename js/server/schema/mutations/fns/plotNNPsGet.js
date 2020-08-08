'use strict';

import NNPsGet from './NNPsGet';

export default (
  plot
) => {

  return plot.reduce(
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

                  return (
                    NNP
                  );
                }
              )
          ]
        )
      ];
    },
    []
  );
};
