'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

import SplashCharacters from './SplashCharacters';

const Splash = (
  props
) => {

  const splashCharactersRender = () => {

    return (
      <div
        className = 'splashCharactersContainer'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 1
            }
          )
        }
      >
        <SplashCharacters
          splash = {
            props.splash
          }
          viewer = {
            props.viewer
          }
          match = {
            props.match
          }
        />
      </div>
    );
  };

  const titleRender = () => {

    return (
      <p
        className = 'p-1 m-0 text-center'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 2,
              width: process.env.OUTPUT_RES,
              left: 0,
              right: 0,
              bottom: 0,
              color: '#fff',
              backgroundColor: '#000',
              opacity: 0.9,
              fontFamily: 'Muli',
              fontSize: 20
            }
          )
        }
      >
        {
          props.splash.title
        }
      </p>
    );
  };

  const imageRender = () => {

    return (
      <img 
        css = {
          css(
            {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)' 
            }
          )
        }
        src = {
          props.splash.poster
        }
      />
    );
  };

  return (
    <div
      className = 'Splash'
      css = {
        css(
          {
            position: 'relative',
            width: `
              ${
                process.env.OUTPUT_RES
              }px
            `
              .trim(),
            height: `
              ${
                process.env.OUTPUT_RES
              }px
            `
              .trim()
          }
        )
      }
    >
      {
        splashCharactersRender()
      }
      {
        titleRender()
      }
      {
        imageRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  Splash,
  {
    splash: graphql`
      fragment Splash_splash on Splash {
        title,
        poster,
        ...SplashCharacters_splash
      }
    `,
    viewer: graphql`
      fragment Splash_viewer on Viewer {
        ...SplashCharacters_viewer
      }
    `
  }
);
