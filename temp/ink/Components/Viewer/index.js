'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';

import OperationSelect from '../OperationSelect';
import OperationCreate from '../OperationCreate';
import OperationRemove from '../OperationRemove';

const sourceFolderPathString = 'utils/actor/source';

const Viewer = (
  {
    db
  }
) => {

  const [
    operationType,
    operationTypeSet
  ] = useState(
    null
  );

  const onOperationSelectHandle = (
    operationType
  ) => {

    return Promise.resolve(
      operationTypeSet(
        operationType
      )
    );
  };

  const onCompletedHandle = () => {

    return Promise.resolve(
      operationTypeSet(
        null
      )
    );
  };

  const operationSelectRender = () => {

    return (
      !operationType
    ) &&
      <OperationSelect
        onOperationSelect = {
          onOperationSelectHandle
        }
      />;
  };

  const operationCreateRender = () => {

    return (
      <OperationCreate
        db = {
          db 
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
        operationType = {
          operationType
        }
        onCompleted = {
          onCompletedHandle
        }
      />
    );
  };

  const operationRemoveRender = () => {

    return (
      <OperationRemove
        db = {
          db
        }
        operationType = {
          operationType
        }
        onCompleted = {
          onCompletedHandle
        }
      />
    );
  };

  const switchRender = () => {

    switch (
      operationType
    ) {

      case (
        '0'
      ) :

        return operationCreateRender();

      case (
        '1'
      ) :

        return operationRemoveRender();

      default :

        return (
          null
        );
    }
  };

  return (
    <Box>
      {
        operationSelectRender()
      }
      {
        switchRender()
      }
    </Box>
  );
};

export default Viewer;
