'use strict';

import React,
{
  useEffect,
  useCallback,
  cloneElement
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Viewer = (
  props
) => {

  const init = useCallback(
    () => {

      if (
        !props.match.location.pathname
          .match('/')
      ) {

        return (
          null
        );
      }

      return props.match.router
        .push(
          `
            /decks/${
              props.viewer.deckId
            }
          `
            .trim()
        );
    },
    [
      props.match.location.pathname,
      props.match.router,
      props.viewer.deckId
    ]
  );

  useEffect(
    () => {

    },
    [

    ]
  );

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
      className = 'Viewer'
    >
      Viewer
      {
        childrenRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  Viewer,
  {
    viewer: graphql`
      fragment Viewer_viewer on Viewer {
        id,
        deckId,
        ...Decks_viewer
      }
    `
  }
);
