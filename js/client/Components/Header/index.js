'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Header = () => {

  return (
    <div
      className = {
        `
          Header
          px-2 py-3
          text-dark
        `
      }
    >
      Header
    </div>
  );
};

export default createFragmentContainer(
  Header,
  {
    viewer: graphql`
      fragment Header_viewer on Viewer {
        id
      }
    `
  }
);
