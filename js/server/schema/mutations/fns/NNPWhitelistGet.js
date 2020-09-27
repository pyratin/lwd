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
    'Hiccup',
    'Willy',
    'Neo',

    'Will',
    'Pi',
    'Ping',
    'Nux',
    'St.' //Flushed Away
  ];
};
