'use strict';

import spoofNamesGetFn from './spoofNamesGet';

const spoofNamesGet = () => {

  const spoofNamesDict = spoofNamesGetFn();

  const spoofNames = Object.keys(
    spoofNamesDict
  )
    .reduce(
      (
        memo,
        key
      ) => {

        return [
          ...memo,
          ...spoofNamesDict[
            key
          ]
        ];
      },
      []
    );

  return (
    spoofNames
  );
};

export default () => {

  return [
    ...spoofNamesGet(),
    'Hiccup', //How to Train Your Dragon 2
    'Willy', //Charlie and the Chocolate Factory (film)
    'Neo', //The Matrix Revolutions
    'Will', //Pirates of the Caribbean: At World's End
    'Pi',
    'Ping',
    'Nux',
    'St.', //Flushed Away
    'Niobe' //The Matrix Reloaded
  ];
};
