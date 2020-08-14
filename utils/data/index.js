'use strict';

import React from 'react';
import {
  render
} from 'ink';

import mongoClientConnect from 
  '~/js/server/fns/mongoClientConnect';
import {
  mongoLocalUriGet,
  mongoRemoteUriGet
} from '~/js/server/fns/variable';
import Viewer from './Components/Viewer';

const sourceFolderPathString = 'temp/source';

(
  async () => {

    const dbLocal = await mongoClientConnect(
      mongoLocalUriGet()
    );

    const dbRemote = await mongoClientConnect(
      mongoRemoteUriGet()
    );

    render(
      <Viewer
        dbLocal = {
          dbLocal
        }
        dbRemote = {
          dbRemote
        }
        sourceFolderPathString = {
          sourceFolderPathString
        }
      />
    );
  }
)();
