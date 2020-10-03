'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const DeckNode = () => {

  return (
    <div
      className = 'DeckNode'
    >
      DeckNode
    </div>
  );
};

export default createFragmentContainer(
  DeckNode,
  {
    viewer: graphql`
      fragment DeckNode_viewer on Viewer {
        id
      }
    `
  }
);
