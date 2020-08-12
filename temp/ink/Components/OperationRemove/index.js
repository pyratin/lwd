'use strict';

import React from 'react';
import {
  Box
} from 'ink';

import OperationRemoveSelect from '../OperationRemoveSelect';

const OperationRemove = () => {

  const operationRemoveSelectRender = () => {

    return (
      <OperationRemoveSelect/>
    );
  };

  return (
    <Box>
      {
        operationRemoveSelectRender()
      }
    </Box>
  );
};

export default OperationRemove;
