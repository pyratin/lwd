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
  ObjectID
} from 'mongodb';

import {
  genreFindOne,
  genreCreate
} from '~/js/server/data/genre';

const GenreCreate = (
  {
    dbLocal,
    onCompleted
  }
) => {

  const [
    genreText,
    genreTextSet
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
    genreText
  ) => {

    return Promise.resolve(
      genreTextSet(
        genreText
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

    const exists = await genreFindOne(
      {
        text: genreText
      },
      undefined,
      dbLocal
    );

    if (
      exists
    ) {

      return errorSet(
        'exists'
      );
    }

    return genreCreate(
      {
        _id: new ObjectID()
      },
      {
        $set: {
          text: genreText
        }
      },
      undefined,
      dbLocal
    )
      .then(
        () => {

          return onCompleted();
        }
      );
  };

  const inkTextInputRender = () => {

    return (
      <InkTextInput
        value = {
          genreText || ''
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
          genre name:
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

export default GenreCreate;
