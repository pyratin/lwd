'use strict';

import React from 'react';
import {
  render
} from 'ink';

import mongoClientConnect from 
  '~/js/server/fns/mongoClientConnect';
import {
  mongoLocalUriGet
} from '~/js/server/fns/variable';
import Viewer from './Components/Viewer';

(
  async () => {
    console.log(mongoLocalUriGet());

    //const dbLocal = await mongoClientConnect(
      //mongoLocalUriGet()
    //);

    //render(
      //<Viewer
        //dbLocal = {
          //dbLocal
        //}
      ///>
    //);
  }
)();
