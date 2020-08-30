'use strict';

export default (
  _cards
) => {

  const cards = _cards.reduce(
    (
      memo,
      _card
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
            _card.paragraphIndex
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
        _card
      ];
    },
    []
  );

  return (
    cards
  );
};
