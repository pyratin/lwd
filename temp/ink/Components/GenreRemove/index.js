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
            db
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

  return (
    <Box>
      {
        genreSelectRender()
      }
    </Box>
  );
};

export default GenreRemove;
