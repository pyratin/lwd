'use strict';

import React, 
{
  cloneElement,
  useEffect,
  useCallback,
  useState
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

  const matchMediaRun = useCallback(
    () => {

      if (
        window.matchMedia(
          '(min-width: 768px)'
        )
          .matches
      ) {

        return widthSet(
          '60%'
        );
      }

      return widthSet(
        '100%'
      );
    },
    []
  );

  const [
    width,
    widthSet
  ] = useState(
    null
  );

  const onWindowResizeHandle = useCallback(
    () => {

      return matchMediaRun();
    },
    [
      matchMediaRun
    ]
  );

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

      window.addEventListener(
        'resize',
        onWindowResizeHandle
      );

      init();

      matchMediaRun();

      return () => {

        window.removeEventListener(
          'resize',
          onWindowResizeHandle
        );
      };
    },
    [
      onWindowResizeHandle,
      init,
      matchMediaRun
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
            width,
            height: '100vh',
            margin: 'auto'
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
