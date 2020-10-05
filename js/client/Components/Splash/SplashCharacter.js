'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

const SplashCharacter = (
  props
) => {

  const textRender = () => {

    return (
      <p
        className = 'p-0 m-0 text-center'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 1,
              width: process.env.OUTPUT_RES,
              left: 0,
              right: 0,
              bottom: 0,
              color: '#fff',
              backgroundColor: '#000',
              fontFamily: 'Muli',
              fontSize: 12
            }
          )
        }
      >
        {
          props.character.renderText
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
              objectFit: 'cover'
            }
          )
        }
        src = {
          props.character.image
        }
      />
    );
  };

  return (
    <div
      className = 'SplashCharacters m-1'
      css = {
        css(
          {
            position: 'relative',
            width: `
              ${
                process.env.OUTPUT_RES /
                4
              }px
            `
              .trim(),
            height: `
              ${
                process.env.OUTPUT_RES /
                4
              }px
            `
              .trim()
          }
        )
      }
    >
      {
        textRender()
      }
      {
        imageRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  SplashCharacter,
  {
    character: graphql`
      fragment SplashCharacter_character on Character {
        renderText,
        image
      }
    `,
    viewer: graphql`
      fragment SplashCharacter_viewer on Viewer {
        id
      }
    `
  }
);
