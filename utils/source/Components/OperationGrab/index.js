'use strict';

import React, {
  useState
} from 'react';
import {
  Box
} from 'ink';

import VideoSelect from '../VideoSelect';

const OperationGrab = (
  {
    videosFolderPathString,
    sourceFolderPathString
  }
) => {

  const [
    sourceFolderName,
    sourceFolderNameSet
  ] = useState(
    null
  );

  const onVideoSelectHandle = (
    sourceFolderName
  ) => {

    return Promise.resolve(
      sourceFolderNameSet(
        sourceFolderName
      )
    );
  };

  const videoSelectRender = () => {

    return (
      !sourceFolderName
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

  return (
    <Box
      flexDirection = 'column'
    >
      {
        videoSelectRender()
      }
    </Box>
  );
};

export default OperationGrab;
