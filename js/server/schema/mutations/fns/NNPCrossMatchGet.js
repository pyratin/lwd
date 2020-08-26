'use strict';

import leven from 'leven';
import combinations from 'combinations';

import wordsTokenizedGet from './wordsTokenizedGet';

const characterStringMatchedGet = (
  character,
  _character
) => {

  return (
    character ===
    _character
  ) ?
    '0' :
    null;
};

const characterLevenMatchedGet = (
  character,
  _character
) => {

  return (
    leven(
      character,
      _character
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

const characterPunctTokenizedGet = (
  character
) => {

  return wordsTokenizedGet(
    character,
    'wordPunct'
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

const characterTokensMatchedGet = (
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

const characterPunctTokensMatchedGet = (
  character,
  _character
) => {

  const characterTokenCombinations = combinations(
    characterPunctTokenizedGet(
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
    '3' :
    null;
};

export default (
  character,
  _character
) => {

  let NNPmatchIndexString;

  switch (
    true
  ) {

    case (
      (
        NNPmatchIndexString = characterStringMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      (
        NNPmatchIndexString = characterLevenMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      (
        NNPmatchIndexString = characterTokensMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      (
        NNPmatchIndexString = characterTokensMatchedGet(
          _character,
          character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      (
        NNPmatchIndexString = characterPunctTokensMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      (
        NNPmatchIndexString = characterPunctTokensMatchedGet(
          _character,
          character
        )
      ) &&
      !!NNPmatchIndexString
    ) :

      return (
        {
          text: character,
          NNPmatchIndex: parseInt(
            NNPmatchIndexString
          ),
          _text: (
            parseInt(
              NNPmatchIndexString
            ) === 
            1
          ) ?
            _character :
            null
        }
      );
  }
};
