'use strict';

const characterExistsGet = (
  character,
  _characters
) => {

  return _characters.find(
    (
      _character
    ) => {

      return (
        (
          _character.role ===
          character.role
        ) &&
        (
          _character.roleGroupIndex ===
          character.roleGroupIndex
        )
      );
    }
  );
};

const charactersRenderAssignedGet = (
  _characters 
) => {

  const characters = _characters.reduce(
    (
      memo,
      _character
    ) => {

      const exists = characterExistsGet(
        _character,
        memo
      );

      if (
        _character.starringCardIndexes &&
        !exists
      ) {
        
        return [
          ...memo,
          {
            ..._character,
            render: true
          }
        ];
      }

      return [
        ...memo,
        {
          ..._character,
          render: false
        }
      ];
    },
    []
  );

  return (
    characters
  );
};

export default (
  _characters
) => {

  let characters = charactersRenderAssignedGet(
    _characters
  );
  console.log(characters);

  return (
    characters
  );
};
