'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

const Share = () => {

  const iconRender = () => {

    return (
      <a 
        href = '#'
      >
        <i
          className = 'fab fa-facebook-square fa-lg text-light'
          css = {
            css(
              {
                opacity: .5
              }
            )
          }
        ></i>
      </a>
    );
  };

  return (
    <div
      className = 'Share'
    >
      {
        iconRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  Share,
  {
    viewer: graphql`
      fragment Share_viewer on Viewer {
        id
      }
    `
  }
);
