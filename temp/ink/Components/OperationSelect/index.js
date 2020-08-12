'use strict';

import React from 'react';
import {
  Box,
  Text
} from 'ink';
import InkSelectInput from 'ink-select-input';

const OperationSelect = (
  {
    onOperationSelect
  }
) => {

  const items = [
    {
      label: 'create',
      value: '0'
    },
    {
      label: 'update',
      value: '1'
    },
    {
      label: 'remove',
      value: '2'
    }
  ];

  const onSelectHandle = (
    {
      value
    }
  ) => {

    return onOperationSelect(
      value
    );
  };

  return (
    <Box
      flexDirection = 'column'
    >
      <Text>
        operation select:
      </Text>

      <InkSelectInput
        items = {
          items
        }
        onSelect = {
          onSelectHandle
        }
      />
    </Box>
  );
};

export default OperationSelect;
