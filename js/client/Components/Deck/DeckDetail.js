'use strict';

import React,
{
  cloneElement
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const DeckDetail = (
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
      className = 'DeckDetail'
    >
      {
        childrenRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  DeckDetail,
  {
    viewer: graphql`
      fragment DeckDetail_viewer on Viewer {
        ...DeckNode_viewer
      }
    `
  }
);
