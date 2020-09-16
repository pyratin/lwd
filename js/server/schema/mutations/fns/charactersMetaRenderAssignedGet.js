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

export default (
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

