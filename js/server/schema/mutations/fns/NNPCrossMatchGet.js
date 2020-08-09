'use strict';

import leven from 'leven';
import combinations from 'combinations';

import wordsTokenizedGet from './wordsTokenizedGet';

const characterStringMatchedGet = (
  plotCharacter,
  castCharacter
) => {

  return (
    plotCharacter ===
    castCharacter
  ) ?
    '0' :
    null;
};

const characterLevenMatchedGet = (
  plotCharacter,
  castCharacter
) => {

  return (
    leven(
      plotCharacter,
      castCharacter
    ) === 1
  ) ?
    '1' :
    null;
};

const characterTokenizedGet = (
  character
) => {

  return wordsTokenizedGet(
    character
  )
    .map(
      (
        {
          text
        }
      ) => {

        return (
          text
        );
      }
    );
};

const characterFragmentMatchedGet = (
  character,
  _character
) => {

  const characterTokenCombinations = combinations(
    characterTokenizedGet(
      _character
    )
  )
    .reduce(
      (
        memo,
        characterTokenCombination
      ) => {

        return [
          ...memo,
          characterTokenCombination.join(
            ' '
          )
        ];
      },
      []
    );

  const characterToken = characterTokenCombinations.find(
    (
      characterToken
    ) => {

      return (
        characterToken ===
        character
      );
    }
  );

  return (
    characterToken
  ) ?
    '2' :
    null;
};

export default (
  plotCharacter,
  castCharacter
) => {

  let matchIndexString;

  switch (
    true
  ) {

    case (
      (
        matchIndexString = characterStringMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterLevenMatchedGet(
          plotCharacter,
          castCharacter
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterFragmentMatchedGet(
          plotCharacter,
          castCharacter,
        )
      ) &&
      !!matchIndexString
    ) :
    case (
      (
        matchIndexString = characterFragmentMatchedGet(
          castCharacter,
          plotCharacter,
        )
      ) &&
      !!matchIndexString
    ) :

      return (
        {
          text: plotCharacter,
          matchIndex: parseInt(
            matchIndexString
          ),
          levenMatchText: (
            parseInt(
              matchIndexString
            ) === 
            1
          ) ?
            castCharacter :
            null
        }
      );
  }
};
