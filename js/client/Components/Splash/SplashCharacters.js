'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

import SplashCharacter from './SplashCharacter';

const SplashCharacters = (
  props
) => {

  const charactersRender = () => {

    return props.splash.characters
      .map(
        (
          character,
          index
        ) => {

          return (
            <SplashCharacter
              key = {
                index
              }
              character = {
                character
              }
              viewer = {
                props.viewer
              }
              match = {
                props.match
              }
            />
          );
        }
      );
  };

  return (
    <div
      className = {
        `
          SplashCharacters
          d-flex
          justify-content-center
          mt-2
        `
      }
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
              .trim()
          }
        )
      }
    >
      <div
        className = 'd-flex'
      >
        {
          charactersRender()
        }
      </div>
    </div>
  );
};

export default createFragmentContainer(
  SplashCharacters,
  {
    splash: graphql`
      fragment SplashCharacters_splash on Splash {
        characters {
          ...SplashCharacter_character
        }
      }
    `,
    viewer: graphql`
      fragment SplashCharacters_viewer on Viewer {
        ...SplashCharacter_viewer
      }
    `
  }
);
