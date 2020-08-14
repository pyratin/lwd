'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';
import {
  ObjectID
} from 'mongodb';

import SetSelect from '../SetSelect';
import {
  setRemove
} from '~/js/server/data/set';

const SetRemove = (
  {
    dbLocal,
    onCompleted
  }
) => {

  const [
    setId,
    setIdSet
  ] = useState(
    null
  );

  const onSelectHandle = (
    setId
  ) => {

    return Promise.resolve(
      setIdSet(
        setId
      )
    )
      .then(
        () => {

          return setRemove(
            {
              _id: new ObjectID(
                setId
              )
            },
            undefined,
            dbLocal
          );
        }
      )
      .then(
        () => {

          return onCompleted();
        }
      );
  };

  const setSelectRender= () => {

    return (
      !setId
    ) &&
      <SetSelect
        dbLocal = {
          dbLocal
        }
        onSetSelect = {
          onSelectHandle
        }
      />;
  };

  return (
    <Box>
      {
        setSelectRender()
      }
    </Box>
  );
};

export default SetRemove;
