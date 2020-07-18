'use strict';

import leven from 'leven';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';

const plotCharactersGet = (
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
              sentence.text
            )
          ]
        )
      ];
    },
    []
  );
};

const castCharactersFlatlistGet = (
  cast
) => {

  return cast.reduce(
    (
      _castMemo,
      _cast,
      castIndex
    ) => {

      const castCharacters = NNPsGet(
        _cast.role
      )
        .reduce(
          (
            castCharacterMemo,
            text,
            roleIndex
          ) => {

            return [
              ...castCharacterMemo,
              {
                text,
                castIndex,
                roleIndex
              }
            ];
          },
          []
        );

      return [
        ..._castMemo,
        ...castCharacters
      ];
    },
    []
  );
};

const characterStringMatchedGet = (
  castCharacter,
  plotCharacter
) => {

  return (
    castCharacter.text ===
    plotCharacter
  ) ?
    castCharacter :
    null;
};

const characterLevenMatchedGet = (
  castCharacter,
  plotCharacter
) => {

  return (
    leven(
      castCharacter.text,
      plotCharacter
    ) === 1
  ) ?
    castCharacter :
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

const characterCastFragmentMatchedGet = (
  castCharacter,
  plotCharacter
) => {

  const characterTokens = characterTokenizedGet(
    castCharacter.text
  )
    .map(
      (
        text
      ) => {

        return {
          ...castCharacter,
          text
        };
      }
    );

  const characterToken = characterTokens.find(
    (
      characterToken
    ) => {

      return (
        characterToken.text ===
        plotCharacter
      );
    }
  );

  return (
    characterToken
  );
};

const characterPlotFragmentMatchedGet = (
  castCharacter,
  plotCharacter
) => {

  const characterTokens = characterTokenizedGet(
    plotCharacter
  );

  const characterToken = characterTokens.find(
    (
      characterToken
    ) => {

      return (
        characterToken ===
        castCharacter.text
      );
    }
  );

  if (
    characterToken
  ) {
    console.log(characterToken);
  }
};

const __castCharactersGetFn = (
  castCharacter,
  plotCharacter
) => {

  let character;

  switch (
    true
  ) {

    case (
      (
        character = characterStringMatchedGet(
          castCharacter,
          plotCharacter
        )
      ) &&
      !!character
    ) :
    case (
      (
        character = characterLevenMatchedGet(
          castCharacter,
          plotCharacter
        )
      ) &&
      !!character
    ) :
    case (
      (
        character = characterCastFragmentMatchedGet(
          castCharacter,
          plotCharacter
        )
      ) &&
      !!character
    ) :
    case (
      (
        character = characterPlotFragmentMatchedGet(
          castCharacter,
          plotCharacter
        )
      ) &&
      !!character
    ) :

      return (
        character
      );
  }
};

const _castCharactersGetFn = (
  _castCharacter,
  plotCharacters
) => {

  const castCharacter = plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let castCharacter;

      if (
        !memo &&
        (
          castCharacter = __castCharactersGetFn(
            _castCharacter,
            plotCharacter
          )
        )
      ) {

        return (
          castCharacter
        );
      }

      return (
        memo
      );
    },
    null
  );

  return (
    castCharacter
  );
};

const castCharactersGetFn = (
  castCharacters,
  plotCharacters
) => {

  const castCharacter = castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      return [
        ...memo,
        _castCharactersGetFn(
          castCharacter,
          plotCharacters
        )
      ];
    },
    []
  );

  return (
    castCharacter
  );
};

const castCharactersGet = (
  cast,
  plotCharacters
) => {

  let castCharacters = castCharactersFlatlistGet(
    cast
  );

  castCharacters = castCharactersGetFn(
    castCharacters,
    plotCharacters
  );

  //console.log(castCharacters);
};

const charactersSortedByDistanceGet = (
  characters
) => {

  return characters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.matchIndex >
          b.matchIndex
        ) :
          
          return 1;

        case (
          b.matchIndex >
          a.matchIndex
        ) :

          return -1;
      }
    }
  );
};

const characterByTextMatchGet = (
  character,
  characters
) => {

  return characters.find(
    (
      _character
    ) => {

      return (
        _character.text.match(
          character.text
        )
      );
    }
  );
};

const _charactersGetFn = (
  characters
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      if (
        !characterByTextMatchGet(
          character,
          memo
        )
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
};

const charactersGetFn = (
  _characters
) => {

  let characters = charactersSortedByDistanceGet(
    _characters
  );

  characters = _charactersGetFn(
    characters
  );

  return (
    characters
  );
};

const charactersCastDataAssignedGet = (
  characters,
  cast
) => {

  return characters.reduce(
    (
      memo,
      character
    ) => {

      return [
        ...memo,
        {
          ...character,
          ...cast[
            character.castIndex
          ]
        }
      ];
    },
    []
  );
};

const charactersGet = (
  castCharacters,
  cast
) => {

  let characters = castCharactersFlatlistGet(
    castCharacters
  );

  characters = charactersGetFn(
    characters
  );

  characters = charactersCastDataAssignedGet(
    characters,
    cast
  );

  return (
    characters
  );
};

export default async (
  cast,
  plot,
  plotText
) => {

  const plotCharacters = plotCharactersGet(
    plot
  );

  const castCharacters = castCharactersGet(
    cast,
    plotCharacters
  );

  //let characters = charactersGet(
    //castCharacters,
    //cast
  //);

  //characters = await charactersCategoryAssignedGet(
    //characters,
    //plotText
  //);

  //characters = await charactersActorGenderAssignedGet(
    //characters
  //);

  //return (
    //characters
  //);
};
