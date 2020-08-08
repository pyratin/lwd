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

const characterMatchRun = (
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

const _charactersGetFn = (
  plotCharacter,
  castCharacters
) => {

  const character = castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      const match = characterMatchRun(
        plotCharacter.text,
        castCharacter.text
      );

      if (
        !memo &&
        match
      ) {

        return {
          ...castCharacter,
          ...match
        };
      }

      return (
        memo
      );
    },
    null
  );

  return (
    character
  );
};

export default (
  plotCharacters,
  castCharacters
) => {

  const characters = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let character = _charactersGetFn(
        plotCharacter,
        castCharacters
      );

      if (
        character
      ) {

        return [
          ...memo,
          character
        ];
      }

      return (
        memo
      );
    },
    []
  );

  return (
    characters
  );
};
