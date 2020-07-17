'use strict';

import leven from 'leven';

import NNPsGet from './NNPsGet';
import wordsTokenizedGet from './wordsTokenizedGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';

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

const characterEqualExistsGet = (
  _character,
  characters
) => {

  const character = (
    characters.find(
      (
        __character
      ) => {

        return (
          __character ===
          _character
        );
      }
    )
  );

  return (
    !!character
  );
};

const characterLevenExistsGet = (
  _character,
  characters
) => {

  const character = characters.reduce(
    (
      memo,
      __character
    ) => {

      if (
        !memo &&
        leven(
          __character,
          _character
        ) === 1
      ) {

        return (
          _character
        );
      }

      return (
        memo
      );
    },
    null
  );

  return (
    !!character
  );
};

const characterTokenizedExistsGet = (
  _character,
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      __character
    ) => {

      return [
        ...memo,
        ...characterTokenizedGet(
          __character
        )
      ];
    },
    []
  );

  const character = characters.find(
    (
      __character
    ) => {

      return (
        __character ===
        _character
      );
    }
  );

  return (
    !!character
  );
};

const characterRegExpExists01Run = (
  _character,
  __character
) => {

  const characterTokenized = characterTokenizedGet(
    _character
  );

  const regExpString = `
    ${
      characterTokenized.reduce(
        (
          memo,
          _characterTokenized
        ) => {

          const prefix = (
            memo
          ) ?
            '\\s"*[A-Z][a-z]+"*\\s' :
            '';

          return `
            ${
              memo
            }${
              prefix
            }${
              _characterTokenized
            }
          `
            .trim();
        },
        ''
      )
    }
  `
    .trim();

  const regExp = new RegExp(
    regExpString
  );

  const match = __character.match(
    regExp
  );

  return (
    !!match
  );
};

const characterRegExpExistsGet = (
  _character,
  characters
) => {

  const character = characters.reduce(
    (
      memo,
      __character
    ) => {

      switch (
        true
      ) {

        case (
          !!memo
        ) :

          return (
            memo
          );

        case (
          characterRegExpExists01Run(
            _character,
            __character
          )
        ) :

          return (
            _character
          );

        default :

          return (
            memo
          );
      }
    },
    null
  );

  return (
    !!character
  );
};

const characterRegExpResults01Run = (
  _character,
  __character
) => {

  const match = _character.match(
    __character
  );

  return (
    !!match
  );
};

const characterRegExpResultsGet = (
  _character,
  _characters
) => {

  const characters = _characters.reduce(
    (
      memo,
      __character
    ) => {

      switch (
        true
      ) {

        case (
          characterRegExpResults01Run(
            _character,
            __character
          )
        ) :

          return [
            ...memo,
            __character
          ];

        default:

          return (
            memo
          );
      }
    },
    []
  );

  return (
    characters
  );
};

const _castCharactersGetFn = (
  _cast,
  _castCharacters,
  plotCharacters
) => {

  return plotCharacters.reduce(
    (
      memo,
      plotCharacter
    ) => {

      let characters;

      switch (
        true
      ) {

        case (
          characterEqualExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterLevenExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterTokenizedExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :
        case (
          characterRegExpExistsGet(
            plotCharacter,
            _castCharacters
          )
        ) :

          return [
            ...memo,
            plotCharacter
          ];

        case (
          (
            characters = characterRegExpResultsGet(
              plotCharacter,
              _castCharacters
            )
          ) &&
          !!characters
        ) :

          return [
            ...memo,
            ...characters
          ];

        default:

          return (
            memo
          );
      }
    },
    []
  );
};

const castCharactersGetFn = (
  _cast,
  plotCharacters
) => {

  let _castCharacters = NNPsGet(
    _cast.role
  )
    .reduce(
      (
        memo,
        character
      ) => {

        if (
          _cast.role.match(
            new RegExp(
              `
                ${
                  character
                }'s
              `
                .trim(),
              'g'
            )
          )
        ) {

          return (
            memo
          );
        }

        return [
          ...new Set(
            [
              ...memo,
              character
            ]
          )
        ];
      },
      []
    );

  _castCharacters = _castCharactersGetFn(
    _cast,
    _castCharacters,
    plotCharacters
  );

  return (
    _castCharacters
  );
};

const castCharactersGet = (
  cast,
  plotCharacters
) => {

  const castCharacters = cast.reduce(
    (
      memo,
      _cast
    ) => {

      return [
        ...memo,
        castCharactersGetFn(
          _cast,
          plotCharacters
        )
      ];
    },
    []
  );

  return (
    castCharacters
  );
};

const castCharactersFlastlistGet = (
  castCharacters
) => {

  return castCharacters.reduce(
    (
      memo,
      _castCharacters,
      castIndex
    ) => {

      return [
        ...memo,
        ..._castCharacters.reduce(
          (
            memo,
            characterText
          ) => {

            return [
              ...memo,
              {
                text: characterText,
                castIndex
              }
            ];
          },
          []
        )
      ];
    },
    []
  );
};

const charactersWeightedGetFn = (
  character,
  cast
) => {

  const role = cast[
    character.castIndex
  ]
    .role;

  const distance = role.match(
    character.text
  )
    .index;

  return {
    ...character,
    distance
  };
};

const charactersWeightedGet = (
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
        charactersWeightedGetFn(
          character,
          cast
        )
      ];
    },
    []
  );
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
          a.distance >
          b.distance
        ) :
          
          return 1;

        case (
          b.distance >
          a.distance
        ) :

          return -1;
      }
    }
  )
    .map(
      (
        character
      ) => {

        delete character.distance;

        return (
          character
        );
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
  _characters,
  cast
) => {

  let characters = charactersWeightedGet(
    _characters,
    cast
  );

  characters = charactersSortedByDistanceGet(
    characters
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

  let characters = castCharactersFlastlistGet(
    castCharacters
  );

  characters = charactersGetFn(
    characters,
    cast
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
