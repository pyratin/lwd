'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';

import CollectionSelect from '../CollectionSelect';
import GenreCreate from '../GenreCreate';

const OperationCreate = (
  {
    db
  }
) => {

  const [
    collectionName,
    collectionNameSet
  ] = useState(
    null
  );

  const onCollectionSelectHandle = (
    collectionName
  ) => {

    return Promise.resolve(
      collectionNameSet(
        collectionName
      )
    );
  };

  const collectionSelectRender = () => {

    return (
      !collectionName
    ) &&
      <CollectionSelect
        db = {
          db
        }
        onCollectionSelect = {
          onCollectionSelectHandle
        }
      />;
  };

  const genreCreateRender = () => {

    return (
      <GenreCreate
        db = {
          db
        }
      />
    );
  };

  const switchRender = () => {

    switch (
      collectionName
    ) {

      case (
        'genres'
      ) :

        return genreCreateRender();
    }
  };

  return (
    <Box>
      {
        collectionSelectRender()
      }
      {
        switchRender()
      }
    </Box>
  );
};

export default OperationCreate;
