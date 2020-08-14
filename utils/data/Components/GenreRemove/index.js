'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';
import {
  ObjectID
} from 'mongodb';

import GenreSelect from '../GenreSelect';
import {
  genreRemove
} from '~/js/server/data/genre';

const GenreRemove = (
  {
    dbLocal,
    onCompleted
  }
) => {

  const [
    genreId,
    genreIdSet
  ] = useState(
    null
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

          return genreRemove(
            {
              _id: new ObjectID(
                genreId
              )
            },
            undefined,
            dbLocal
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
        dbLocal = {
          dbLocal
        }
        onGenreSelect = {
          onGenreSelectHandle
        }
      />;
  };

  return (
    <Box>
      {
        genreSelectRender()
      }
    </Box>
  );
};

export default GenreRemove;
