'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text
} from 'ink';
import InkTextInput from 'ink-text-input';

import {
  setFindOne
} from '~/js/server/data/set';

const SetCreate = (
  {
    db
  }
) => {

  const [
    setText,
    setTextSet
  ] = useState(
    null
  );

  const [
    error,
    errorSet
  ] = useState(
    null
  );

  const onChangeHandle = (
    setText
  ) => {

    return Promise.resolve(
      setTextSet(
        setText
      )
    )
      .then(
        () => {

          return Promise.resolve(
            errorSet(
              null
            )
          );
        }
      );
  };

  const onSubmitHandle = async () => {

    const exists = await setFindOne(
      {
        text: setText
      },
      undefined,
      db
    );

    console.log(exists);
  };

  const inkTextInputRender = () => {

    return (
      <InkTextInput
        value = {
          setText || ''
        }
        onChange = {
          onChangeHandle
        }
        onSubmit = {
          onSubmitHandle
        }
      />
    );
  };

  const errorRender = () => {

    return (
      <Box
        marginLeft = {1}
      >
        <Text
          color = 'red'
        >
          {
            error
          }
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Box
        marginRight = {1}
      >
        <Text>
          set name:
        </Text>
      </Box>
      {
        inkTextInputRender()
      }
      {
        errorRender()
      }
    </Box>
  );
};

export default SetCreate;
