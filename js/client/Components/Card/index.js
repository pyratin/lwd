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

  const filterGet = () => {

    switch (
      true
    ) {

      case (
        !props.card.actorImageId
      ) :

        return (
          'grayscale(100%)'
        );

      case (
        props.card.dualRoleIndex >=
        0
      ) :

        return (
          'hue-rotate(-20deg)'
        );
    }
  };

  const textRender = () => {

    return (
      <p
        className = 'p-1 m-0 text-center'
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

  const imageRender = () => {

    return (
      <img
        css = {
          css(
            {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: filterGet()
            }
          )
        }
        src = {
          props.card.image
        }
      />
    );
  };

  return (
    <div
      className = 'Card'
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
        textRender()
      }
      {
        imageRender()
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
        renderText,
        actorImageId,
        dualRoleIndex
      }
    `,
    viewer: graphql`
      fragment Card_viewer on Viewer {
        id
      }
    `
  }
);
