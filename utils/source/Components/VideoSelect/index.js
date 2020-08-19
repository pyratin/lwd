'use strict';

import path from 'path';
import React,
{
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Text
} from 'ink';
import InkSelectInput from 'ink-select-input';
import shelljs from 'shelljs';


const VideoSelect = (
  {
    videosFolderPathString,
    sourceFolderPathString,
    onVideoSelect
  }
) => {

  const [
    videoNames,
    videoNamesSet
  ] = useState(
    null
  );

  const videoNamesFilteredGet = useCallback(
    (
      videoNames,
      sourceFolderNames
    ) => {

      return videoNames.reduce(
        (
          memo,
          videoName
        ) => {

          const match = videoName.match(
            /(.+)\.mp4$/
          )?.[
            1
          ];

          const exists = sourceFolderNames.find(
            (
              sourceFolderName
            ) => {

              return (
                sourceFolderName ===
                match
              );
            }
          );

          if (
            !exists
          ) {

            return [
              ...memo,
              match
            ];
          }

          return (
            memo
          );
        },
        []
      );
    },
    []
  );

  const videoNamesFetch = useCallback(
    () => {

      let videoNames = shelljs.ls(
        path.join(
          process.cwd(),
          videosFolderPathString
        )
      );

      const sourceFolderNames = shelljs.ls(
        path.join(
          process.cwd(),
          sourceFolderPathString
        )
      );

      videoNames = videoNamesFilteredGet(
        videoNames,
        sourceFolderNames
      );

      videoNames = videoNames.map(
        (
          videoName
        ) => {

          return {
            label: videoName,
            value: videoName
          };
        }
      );

      return Promise.resolve(
        videoNamesSet(
          videoNames
        )
      );
    },
    [
      videosFolderPathString,
      sourceFolderPathString,
      videoNamesFilteredGet
    ]
  );

  useEffect(
    () => {

      videoNamesFetch();
    },
    [
      videoNamesFetch
    ]
  );

  const onSelectHandle = (
    (
      {
        value
      } 
    ) => {

      return Promise.resolve(
        onVideoSelect(
          value
        )
      );
    }
  );

  const inkSelectInputRender = () => {

    return (
      videoNames
    ) &&
      <InkSelectInput
        items = {
          videoNames
        }
        onSelect = {
          onSelectHandle
        }
      />;
  };

  return (
    <Box
      flexDirection = 'column'
    >
      <Text>
        video select:
      </Text>
      {
        inkSelectInputRender()
      }
    </Box>
  );
};

export default VideoSelect;
