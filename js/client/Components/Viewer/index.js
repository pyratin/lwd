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
import {
  css
} from '@emotion/core';

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
      className = 'Viewer pb-5 bg-dark'
      css = {
        css(
          {
            height: '100vh'
          }
        )
      }
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
