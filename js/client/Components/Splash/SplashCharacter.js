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
        className = 'p-0 m-0 text-center text-light bg-dark'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 1,
              left: 0,
              right: 0,
              bottom: 0,
              fontFamily: 'Muli',
              fontSize: '1rem'
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

  return (
    <div
      className = 'SplashCharacters m-2 rounded rounded-lg'
      css = {
        css(
          {
            position: 'relative',
            width: '120px',
            height: '120px',
            backgroundImage: `
              url("${
                props.character.image
              }")
            `
              .trim(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(50%) brightness(1.25)'
          }
        )
      }
    >
      {
        textRender()
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
