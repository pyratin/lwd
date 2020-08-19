'use strict';

import React,
{
  useState
} from 'react';
import {
  Box
} from 'ink';

import OperationSelect from '../OperationSelect';
import OperationDownload from '../OperationDownload';
import OperationGrab from '../OperationGrab';

const Viewer = (
  {
    videosFolderPathString,
    sourceFolderPathString
  }
) => {

  const [
    operationType,
    operationTypeSet
  ] = useState(
    '1'
  );

  const onOperationSelectHandle = (
    operationType
  ) => {

    return Promise.resolve(
      operationTypeSet(
        operationType
      )
    );
  };

  const onCompletedHandle = () => {

    return Promise.resolve(
      operationTypeSet(
        null
      )
    );
  };

  const operationSelectRender = () => {

    return (
      !operationType
    ) &&
      <OperationSelect
        onOperationSelect = {
          onOperationSelectHandle
        }
      />;
  };

  const opearationDownloadRender = () => {

    return (
      <OperationDownload
        videosFolderPathString = {
          videosFolderPathString
        }
        onCompleted = {
          onCompletedHandle
        }
      />
    );
  };

  const operationGrabRender = () => {

    return (
      <OperationGrab
        videosFolderPathString = {
          videosFolderPathString
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
      />
    );
  };

  const switchRender = () => {

    switch (
      operationType
    ) {

      case (
        '0'
      ) :

        return opearationDownloadRender();

      case (
        '1'
      ) :

        return operationGrabRender();
    }
  };

  return (
    <Box>
      {
        operationSelectRender()
      }
      {
        switchRender()
      }
    </Box>
  );
};

export default Viewer;
