'use strict';

import React from 'react';
import {
  Box
} from 'ink';

import OperationSelect from '../OperationSelect';

const Viewer = () => {

  const operationSelectRender = () => {

    return (
      <OperationSelect/>
    );
  };

  return (
    <Box>
      {
        operationSelectRender()
      }
    </Box>
  );
};

export default Viewer;
