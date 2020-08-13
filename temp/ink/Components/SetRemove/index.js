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
    db,
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
            db
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
        db = {
          db
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
