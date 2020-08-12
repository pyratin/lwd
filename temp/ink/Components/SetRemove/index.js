'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text
} from 'ink';
import {
  ObjectID
} from 'mongodb';
import InkSpinner from 'ink-spinner';

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

  const [
    loading,
    loadingSet
  ] = useState(
    false
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

          return Promise.resolve(
            loadingSet(
              true
            )
          );
        }
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

          return new Promise(
            (
              resolve
            ) => {

              return setTimeout(
                () => {

                  return resolve(
                    null
                  );
                },
                1000
              );
            }
          );
        }
      )
      .then(
        () => {

          return Promise.resolve(
            loadingSet(
              false
            )
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

  const loadingRender = () => {

    return (
      loading
    ) &&
      <Box
        width = '100%'
        justifyContent = 'center'
      >
        <Text>
          <InkSpinner/>
        </Text>
      </Box>;
  };

  return (
    <Box>
      {
        setSelectRender()
      }
      {
        loadingRender()
      }
    </Box>
  );
};

export default SetRemove;
