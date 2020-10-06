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
import SplashSpoofInput from './SplashSpoofInput';

const Splash = (
  props
) => {

  const splashCharactersRender = () => {

    return (
      <div
        className = {
          `
            splashCharactersContainer
            w-100
            d-flex justify-content-center
            pt-2
          `
        }
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

  const splashSpoofInputRender = () => {

    return (
      <SplashSpoofInput
        viewer = {
          props.viewer
        }
      />
    );
  };

  const titleRender = () => {

    return (
      <div
        className = 'titleContainer text-center'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 1,
              left: 0,
              right: 0,
              bottom: 0,
              fontFamily: 'Muli',
              fontSize: 22
            }
          )
        }
      >
        {
          splashSpoofInputRender()
        }
        <div
          className = {
            `
              d-inline-block 
              px-2 m-2
              rounded-circle
              border border-secondary
              text-white
              bg-dark
            `
          }
        >
          in
        </div>
        <p
          className = 'p-1 m-0 bg-dark text-white'
        >
          {
            props.splash.title
          }
        </p>
      </div>
    );
  };

  const imageRender = () => {

    return (
      <img 
        css = {
          css(
            {
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
                .trim(),
              objectFit: 'cover',
              filter: 
              'grayscale(100%)',
              opacity: .25
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
      className = 'Splash bg-dark'
      css = {
        css(
          {
            position: 'relative'
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
        ...SplashCharacters_viewer,
        ...SplashSpoofInput_viewer
      }
    `
  }
);
