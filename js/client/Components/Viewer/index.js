'use strict';

import React, 
{
  cloneElement,
  useEffect,
  useCallback
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
          .match(
            /^\/$/
          )
      ) {

        return (
          null
        );
      }

      return props.match.router
        .push(
          `
            /Deck/${
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

      init();
    },
    [
      init
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
        ...Home_viewer,
        ...Deck_viewer
      }
    `
  }
);
