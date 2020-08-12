'use strict';

import React from 'react';
import {
  render
} from 'ink';

import mongoClientConnect from 
  '~/js/server/fns/mongoClientConnect';
import Viewer from './Components/Viewer';

(
  async () => {

    const db = await mongoClientConnect();

    render(
      <Viewer
        db = {
          db
        }
      />
    );
  }
)();
