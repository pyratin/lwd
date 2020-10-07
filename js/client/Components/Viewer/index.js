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

import Header from 'Components/Header';
import Footer from 'Components/Footer';

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

  const headerRender = () => {

    return (
      <Header
        viewer = {
          props.viewer
        }
        match = {
          props.match
        }
      />
    );
  };

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

  const contentRender = () => {

    return (
      <div
        className = {
          `
            contentContainer 
            flex-fill
            d-flex
            justify-content-center
          `
        }
      >
        <div
          className = 'content w-100'
          css = {
            css(
              {
                maxWidth: 768
              }
            )
          }
        >
          {
            childrenRender()
          }
        </div>
      </div>
    );
  };

  const footerRender = () => {

    return (
      <Footer
        viewer = {
          props.viewer
        }
        match = {
          props.match
        }
      />
    );
  };

  return (
    <div
      className = 'Viewer d-flex flex-column'
      css = {
        css(
          {
            height: '100vh'
          }
        )
      }
    >
      {
        headerRender()
      }
      {
        contentRender()
      }
      {
        footerRender()
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
        ...Header_viewer,
        ...Home_viewer,
        ...Deck_viewer,
        ...Footer_viewer
      }
    `
  }
);
