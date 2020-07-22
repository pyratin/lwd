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
            text
          ) => {

            return [
              ...castCharacterMemo,
              {
                text,
                castIndex,
                roleIndex: _cast.role
                  .match(
                    text
                  )
                  .index
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

const characterFragmentMatchedGet = (
  character,
  _character
) => {

  const characterTokens = characterTokenizedGet(
    character
  );
  console.log(characterTokens, _character);

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
    //case (
      //(
        //text = characterFragmentMatchedGet(
          //castCharacter.text,
          //plotCharacter
        //)
      //) &&
      //!!text
    //) :
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

const castCharactersSortedGet = (
  castCharacters
) => {

  return castCharacters.sort(
    (
      a, b
    ) => {

      switch (
        true
      ) {

        case (
          a.roleIndex >
          b.roleIndex
        ) :

          return 1;

        case (
          b.roleIndex >
          a.roleIndex
        ) :

          return -1;

        case (
          a.castIndex >
          b.castIndex
        ) :

          return 1;

        case (
          b.castIndex >
          a.castIndex
        ) :

          return -1;
      }
    }
  );
};

const characterExistsGet = (
  character,
  characters
) => {

  return characters.find(
    (
      _character
    ) => {

      return (
        _character.text ===
        character.text
      );
    }
  );
};

const castCharactersUniqueGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      castCharacter
    ) => {

      if (
        !characterExistsGet(
          castCharacter,
          memo
        )
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

  castCharacters = castCharactersSortedGet(
    castCharacters
  );

  castCharacters = castCharactersUniqueGet(
    castCharacters
  );

  return (
    castCharacters
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
  )
    .map(
      (
        character
      ) => {

        delete character.roleIndex;

        return (
          character
        );
      }
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

  let characters = charactersCastDataAssignedGet(
    castCharacters,
    cast
  );

  characters = await charactersCategoryAssignedGet(
    characters,
    plotText
  );

  characters = await charactersActorGenderAssignedGet(
    characters
  );

  return (
    characters
  );
};
