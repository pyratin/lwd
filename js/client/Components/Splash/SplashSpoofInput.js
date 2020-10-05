'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const SplashSpoofInput = () => {

  const renderFn = () => {

    return (
      <form

      >
        <input
          placeholder = 'hero (you)'
        />
      </form>
    );
  };

  return (
    <div
      className = 'SplashSpoofInput'
    >
      {
        renderFn()
      }
    </div>
  );
};

export default createFragmentContainer(
  SplashSpoofInput,
  {
    viewer: graphql`
      fragment SplashSpoofInput_viewer on Viewer {
        id
      }
    `
  }
);
