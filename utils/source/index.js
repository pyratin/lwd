'use strict';

import React from 'react';
import {
  render
} from 'ink';

import Viewer from './Components/Viewer';

const videosFolderPathString = 'temp/videos';

const sourceFolderPathString = 'temp/source';

(
  async () => {

    render(
      <Viewer
        videosFolderPathString = {
          videosFolderPathString
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
      />
    );
  }
)();
