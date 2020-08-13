'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';

import CollectionSelect from '../CollectionSelect';
import GenreCreate from '../GenreCreate';
import SetCreate from '../SetCreate';

const OperationCreate = (
  {
    db,
    sourceFolderPathString,
    operationType,
    onCompleted
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
        onCompleted = {
          onCompleted
        }
      />
    );
  };

  const setCreateRender = () => {

    return (
      <SetCreate
        db = {
          db
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
        operationType = {
          operationType
        }
        onCompleted = {
          onCompleted
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

      case (
        'sets'
      ) :

        return setCreateRender();
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
