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

const Viewer = (
  {
    db
  }
) => {

  const [
    operation,
    operationSet
  ] = useState(
    null
  );

  const onOperationSelectHandle = (
    operation
  ) => {

    return Promise.resolve(
      operationSet(
        operation
      )
    );
  };

  const onCompletedHandle = () => {

    return Promise.resolve(
      operationSet(
        null
      )
    );
  };

  const operationSelectRender = () => {

    return (
      !operation
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
        onCompleted = {
          onCompletedHandle
        }
      />
    );
  };

  const switchRender = () => {

    switch (
      operation
    ) {

      case (
        '0'
      ) :

        return operationCreateRender();

      case (
        '2'
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
