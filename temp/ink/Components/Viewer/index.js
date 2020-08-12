'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';

import OperationSelect from '../OperationSelect';
import OperationRemove from '../OperationRemove';

const Viewer = () => {

  const [
    operation,
    operationSet
  ] = useState(
    '2'
  );

  const onOperationSelectHandle = (
    value
  ) => {

    return operationSet(
      value
    );
  };

  const operationSelectRender = () => {

    return (
      <OperationSelect
        onOperationSelect = {
          onOperationSelectHandle
        }
      />
    );
  };

  const operationRemoveRender = () => {

    return (
      <OperationRemove/>
    );
  };

  const operationRender = () => {

    switch (
      operation
    ) {

      case (
        '2'
      ) :

        return operationRemoveRender();
    }
  };

  const switchRender = () => {

    return (
      !operation
    ) ?
      operationSelectRender() :
      operationRender();
  };

  return (
    <Box>
      {
        switchRender()
      }
    </Box>
  );
};

export default Viewer;
