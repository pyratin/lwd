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
  character,
  _character
) => {

  return (
    character ===
    _character
  ) ?
    character :
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
    _character :
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

const characterRegExpMatchedGet = (
  character,
  _character
) => {

  const characterTokens = characterTokenizedGet(
    _character
  );

  const regExpString = characterTokens.reduce(
    (
      memo,
      characterToken
    ) => {

      const _prefix = '\\s"*[A-Z][a-z]+"*\\s';

      const prefix = (
        memo
      ) ?
        _prefix :
        '';

      const regExpString = `
        ${
          memo ||
          ''
        }${
          prefix
        }${
          characterToken
        }
      `
        .trim();
      return (
        regExpString
      );
    },
    null
  );

  const regExp = new RegExp(
    regExpString
  );

  const match = character.match(
    regExp
  );

  return (
    (
      characterTokens.length > 1
    ) &&
    match
  ) ?
    _character :
    null;
};

const characterFragmentMatchedGet = (
  character,
  _character
) => {

  const characterTokens = characterTokenizedGet(
    character
  );

  const characterToken = characterTokens.find(
    (
      characterToken
    ) => {

      return (
        characterToken ===
        _character
      );
    }
  );

  return (
    (
      characterTokens.length > 1 
    ) &&
    characterToken
  ) ?
    characterToken :
    null;
};

const __castCharactersGetFn = (
  castCharacter,
  plotCharacter
) => {

  let text;

  switch (
    true
  ) {

    case (
      (
        text = characterStringMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!text
    ) :
    case (
      (
        text = characterLevenMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!text
    ) :
    case (
      (
        text = characterRegExpMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!text
    ) :
    case (
      (
        text = characterRegExpMatchedGet(
          plotCharacter,
          castCharacter.text
        )
      ) &&
      !!text
    ) :
    case (
      (
        text = characterFragmentMatchedGet(
          castCharacter.text,
          plotCharacter
        )
      ) &&
      !!text
    ) :
    case (
      (
        text = characterFragmentMatchedGet(
          plotCharacter,
          castCharacter.text
        )
      ) &&
      !!text
    ) :

      return {
        ...castCharacter,
        text
      };
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

      const castCharacter = __castCharactersGetFn(
        _castCharacter,
        plotCharacter
      );

      if (
        !memo &&
        castCharacter
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
      _castCharacter
    ) => {

      let castCharacter = _castCharactersGetFn(
        _castCharacter,
        plotCharacters
      );

      if (
        castCharacter
      ) {

        return [
          ...memo,
          castCharacter
        ];
      }

      return (
        memo
      );
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

  console.log(castCharacters);
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
