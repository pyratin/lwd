'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text
} from 'ink';
import InkSpinner from 'ink-spinner';
import {
  ObjectID
} from 'mongodb';

import GenreSelect from '../GenreSelect';
import {
  genreRemove
} from '~/js/server/data/genre';

const GenreRemove = (
  {
    db,
    onCompleted
  }
) => {

  const [
    genreId,
    genreIdSet
  ] = useState(
    null
  );

  const [
    loading,
    loadingSet
  ] = useState(
    false
  );

  const onGenreSelectHandle = (
    genreId
  ) => {

    return Promise.resolve(
      genreIdSet(
        genreId
      )
    )
      .then(
        () => {

          return Promise.resolve(
            loadingSet(
              true
            )
          );
        }
      )
      .then(
        () => {

          return genreRemove(
            {
              _id: new ObjectID(
                genreId
              )
            },
            undefined,
            db
          );
        }
      )
      .then(
        () => {

          return new Promise(
            (
              resolve
            ) => {

              return setTimeout(
                () => {

                  return resolve(
                    null
                  );
                },
                1000
              );
            }
          );
        }
      )
      .then(
        () => {

          return Promise.resolve(
            loadingSet(
              false
            )
          );
        }
      )
      .then(
        () => {

          return onCompleted();
        }
      );
  };

  const genreSelectRender = () => {

    return (
      !genreId 
    ) &&
      <GenreSelect
        db = {
          db
        }
        onGenreSelect = {
          onGenreSelectHandle
        }
      />;
  };

  const loadingRender = () => {

    return (
      loading
    ) &&
      <Box
        width = '100%'
        justifyContent = 'center'
      >
        <Text>
          <InkSpinner/>
        </Text>
      </Box>;
  };

  return (
    <Box>
      {
        genreSelectRender()
      }
      {
        loadingRender()
      }
    </Box>
  );
};

export default GenreRemove;
