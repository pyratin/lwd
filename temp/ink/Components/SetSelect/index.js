'use strict';

import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Text
} from 'ink';
import InkSelectInput from 'ink-select-input';

import {
  setsFind
} from '~/js/server/data/set';

const SetSelect = (
  {
    db,
    onSetSelect
  }
) => {

  const [
    sets,
    setsSet
  ] = useState(
    null
  );

  const setsFetch = useCallback(
    () => {

      if(
        sets
      ) {

        return (
          null
        );
      }

      return setsFind(
        undefined,
        undefined,
        db
      )
        .then(
          (
            res
          ) => {

            const sets = res.map(
              (
                {
                  _id: setId,
                  text
                }
              ) => {

                return {
                  label: text,
                  value: text,
                  setId
                };
              }
            );

            return Promise.resolve(
              setsSet(
                sets
              )
            );
          }
        );
    },
    [
      sets,
      db
    ]
  );

  useEffect(
    () => {

      setsFetch();
    },
    [
      setsFetch
    ]
  );

  const onSelectHandle = (
    {
      setId
    }
  ) => {

    return onSetSelect(
      setId
    );
  };

  const inkSelectInputRender = () => {

    return (
      sets
    ) &&
      <InkSelectInput
        items = {
          sets
        }
        onSelect = {
          onSelectHandle
        }
      />;
  };

  return (
    <Box
      flexDirection = 'column'
    >
      <Text>
        set select:
      </Text>

      {
        inkSelectInputRender() 
      }
    </Box>
  );
};

export default SetSelect;
