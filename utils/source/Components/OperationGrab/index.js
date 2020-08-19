'use strict';

import React, {
  useState
} from 'react';
import {
  Box,
  Text
} from 'ink';

import VideoSelect from '../VideoSelect';
import grab from '../../fns/grab';

const OperationGrab = (
  {
    videosFolderPathString,
    sourceFolderPathString
  }
) => {

  const [
    videoName,
    videoNameSet
  ] = useState(
    null
  );

  const [
    loading,
    loadingSet
  ] = useState(
    false
  );

  const onVideoSelectHandle = (
    videoName,
    sourceFolderName
  ) => {

    return Promise.resolve(
      loadingSet(
        true
      )
    )
      .then(
        () => {

          return Promise.resolve(
            videoNameSet(
              videoName
            )
          );
        }
      )
      .then(
        () => {

          return grab(
            videoName,
            sourceFolderName,
            videosFolderPathString,
            sourceFolderPathString
          );
        }
      );
  };

  const videoSelectRender = () => {

    return (
      !videoName
    ) &&
      <VideoSelect
        videosFolderPathString = {
          videosFolderPathString
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
        onVideoSelect = {
          onVideoSelectHandle
        }
      />;
  };

  const loadingRender = () => {

    return (
      loading
    ) &&
      <Box>
        <Text>
          running ...
        </Text>
      </Box>;
  };

  return (
    <Box
      flexDirection = 'column'
    >
      {
        videoSelectRender()
      }
      {
        loadingRender()
      }
    </Box>
  );
};

export default OperationGrab;
