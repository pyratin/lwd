'use strict';

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
    '1' :
    null;
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
    '2' :
    null;
};

const characterTokensRegExpMatchedGet = (
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

      if (
        character === 'George Mac McHale' &&
        _character.match(/George/)
      ) {

        console.log(characterToken, '        ', character);
      }

      return (
        character.match(
          characterToken
        )
      );
    }
  );
  if (
    characterToken
  ) {
    console.log('characterToken', characterToken);
  }

  return (
    characterToken
  ) ?
    '3' :
    null;
};

export default (
  character,
  _character,
  strict = false
) => {

  if (
    !character ||
    !_character
  ) {

    return (
      null
    );
  }

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
      !strict &&
      (
        NNPmatchIndexString = characterTokensMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      !strict &&
      (
        NNPmatchIndexString = characterTokensMatchedGet(
          _character,
          character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      !strict &&
      (
        NNPmatchIndexString = characterPunctTokensMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      !strict &&
      (
        NNPmatchIndexString = characterPunctTokensMatchedGet(
          _character,
          character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      !strict &&
      (
        NNPmatchIndexString = characterTokensRegExpMatchedGet(
          character,
          _character
        )
      ) &&
      !!NNPmatchIndexString
    ) :
    case (
      !strict &&
      (
        NNPmatchIndexString = characterTokensRegExpMatchedGet(
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
          )
        }
      );
  }
};
