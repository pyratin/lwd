'use strict';

import React from 'react';
import {
  Box
} from 'ink';

import CollectionSelect from '../CollectionSelect';

const OperationRemoveSelect = () => {

  const collectionSelectRender = () => {

    return (
      <CollectionSelect/>
    );
  };

  return (
    <Box
      flexDirection = 'column'
    >
      {
        collectionSelectRender()
      }
    </Box>
  );
};

export default OperationRemoveSelect;
