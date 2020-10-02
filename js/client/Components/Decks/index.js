'use strict';

import React, 
{
  cloneElement
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Decks = (
  props
) => {

  const childrenRender = () => {

    return (
      props.children
    ) &&
      cloneElement(
        props.children,
        {
          viewer: props.viewer,
          match: props.match
        }
      );
  };

  return (
    <div
      className = 'Decks'
    >
      Decks
    </div>
  );
};

export default createFragmentContainer(
  Decks,
  {
    viewer: graphql`
      fragment Decks_viewer on Viewer {
        id
      }
    `
  }
);
