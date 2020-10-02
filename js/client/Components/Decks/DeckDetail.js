'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const DeckDetail = () => {

  return (
    <div
      className = 'DeckDetail'
    >
      DeckDetail
    </div>
  );
};

export default createFragmentContainer(
  DeckDetail,
  {
    viewer: graphql`
      fragment DeckDetail_viewer on Viewer {
        id
      }
    `
  }
);
