'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text,
  useInput,
  render
} from 'ink';

const InkConfirmInput = (
  {
    isChecked
  }
) => {

  const [
    value,
    valueSet
  ] = useState(
    isChecked
  );

  const [
    done,
    doneSet
  ] = useState(
    false
  );

  const promptString = (
    isChecked
  ) ?
    'Y/n' :
    'y/N';

  const doneString = (
    value
  ) ?
    'Yes' :
    'No';

  const onInputHandle = (
    input
  ) => {

    return Promise.resolve(
      valueSet(
        input
      )
    )
      .then(
        () => {

          return Promise.resolve(
            doneSet(
              true
            )
          );
        }
      );
  };

  useInput(
    (
      input,
      key
    ) => {

      switch (
        true
      ) {

        case (
          !!key.return
        ) :

          return onInputHandle(
            isChecked
          );

        case (
          input ===
          'y'
        ) :

          return onInputHandle(
            true
          );

        case (
          input ===
          'n'
        ) :

          return onInputHandle(
            false
          );
      }
    }
  );

  return (
    <Box>
      <Box
        marginRight = {1}
      >
        <Text>
          create new? 
        </Text>
      </Box>

      <Text
        color = {
          (
            !done
          ) ?
            'grey' :
            'black'
        }
      >
        {
          (
            !done
          ) ?
            promptString :
            doneString
        }
      </Text>
    </Box>
  );
};

render(
  <InkConfirmInput
    isChecked = {
      true
    }
  />
);
