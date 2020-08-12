'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text
} from 'ink';
import InkTextInput from 'ink-text-input';

const GenreCreate = () => {

  const [
    genreText,
    genreTextSet
  ] = useState(
    null
  );

  const onSubmitHandle = () => {
    console.log('HERE');
  };

  const inkTextInputRender = () => {

    return (
      <InkTextInput
        value = {
          genreText || ''
        }
        onChange = {
          genreTextSet
        }
        onSubmit = {
          onSubmitHandle
        }
      />
    );
  };

  return (
    <Box>

      <Box
        marginRight = {1}
      >
        <Text>
          genre name:
        </Text>
      </Box>

      {
        inkTextInputRender()
      }
    </Box>
  );
};

export default GenreCreate;
