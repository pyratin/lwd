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

import FolderSelect from '../FolderSelect';
import GenreSelect from '../GenreSelect';
import {
  setCreate
} from '~/js/server/data/set';
import actorsCreate from '../../fns/actorsCreate';
import actorImagesCreate from '../../fns/actorImagesCreate';

const SetCreate = (
  {
    dbLocal,
    sourceFolderPathString,
    operationType,
    onCompleted
  }
) => {

  const [
    setText,
    setTextSet
  ] = useState(
    null
  );

  const [
    genreId,
    genreIdSet
  ] = useState(
    null
  );

  const onFolderSelectHandle = (
    setText
  ) => {

    return Promise.resolve(
      setTextSet(
        setText
      )
    );
  };

  const onGenreSelectHandle = (
    genreId
  ) => {

    return Promise.resolve(
      genreIdSet(
        genreId
      )
    )
      .then(
        async () => {

          const set = await setCreate(
            {
              _id: new ObjectID()
            },
            {
              $set: {
                _genreId: new ObjectID(
                  genreId
                ),
                text: setText
              }
            },
            undefined,
            dbLocal
          );

          const setFolderPathString = `
            ${
              sourceFolderPathString
            }/${
              set.text
            }
          `
            .trim();

          const actors = await actorsCreate(
            set._id,
            setFolderPathString,
            dbLocal
          );

          await actorImagesCreate(
            actors,
            setFolderPathString,
            dbLocal
          );

          return (
            null
          );
        }
      )
      .then(
        () => {

          return onCompleted();
        }
      );
  };

  const folderSelectRender = () => {

    return (
      !setText &&
      !genreId
    ) &&
      <FolderSelect
        dbLocal = {
          dbLocal
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
        operationType = {
          operationType
        }
        onFolderSelect = {
          onFolderSelectHandle
        }
      />;
  };

  const genreSelectRender = () => {

    return (
      setText &&
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
        folderSelectRender()
      }
      {
        genreSelectRender()
      }
    </Box>
  );
};

export default SetCreate;
