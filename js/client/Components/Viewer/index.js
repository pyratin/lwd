'use strict';

import React from 'react';
import {
  graphql,
  createFragmentContainer
} from 'react-relay';

const Viewer = () => {

  return (
    <div
      className = 'Viewer'
    >
      Viewer
    </div>
  );
};

export default createFragmentContainer(
  Viewer,
  {
    viewer: graphql`
      fragment Viewer_viewer on Viewer {
        id
      }
    `
  }
);
