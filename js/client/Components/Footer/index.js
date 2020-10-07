'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Footer = () => {

  return (
    <div
      className = {
        `
          Footer 
          p-2
          text-secondary 
        `
      }
    >
      pyratin@gmail.com
    </div>
  );
};

export default createFragmentContainer(
  Footer,
  {
    viewer: graphql`
      fragment Footer_viewer on Viewer {
        id
      }
    `
  }
);
