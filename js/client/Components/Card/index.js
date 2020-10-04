'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

const Card  = (
  props
) => {

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
          props.card.image
        }
      />
    );
  };

  const textRender = () => {

    return (
      <p
        className = 'p-1 m-0 text-center'
        css = {
          css(
            {
              position: 'absolute',
              width: process.env.OUTPUT_RES,
              bottom: 0,
              color: '#fff',
              backgroundColor: '#000',
              opacity: 0.9,
              fontFamily: 'Muli',
              fontSize: 20
            }
          )
        }
        dangerouslySetInnerHTML = {{
          __html: props.card.renderText
        }}
      ></p>
    );
  };

  return (
    <div
      className = 'Card'
      css = {
        css(
          {
            position: 'relative',
            maxWidth: `
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
        imageRender()
      }
      {
        textRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  Card,
  {
    card: graphql`
      fragment Card_card on Card {
        image,
        renderText
      }
    `,
    viewer: graphql`
      fragment Card_viewer on Viewer {
        id
      }
    `
  }
);
