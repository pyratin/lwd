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
          'hue-rotate(20deg)'
        );
    }
  };

  const textRender = () => {

    return (
      <p
        className = 'p-1 m-0 text-center text-white bg-dark'
        css = {
          css(
            {
              position: 'absolute',
              zIndex: 1,
              left: 0,
              right: 0,
              bottom: 0,
              minHeight: props.textElementMinHeight,
              fontFamily: 'Muli',
              fontSize: props.textFontSize
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
      className = 'Card w-100 h-100'
    >
      <div>
        {
          textRender()
        }
      </div>
      <div
        className = 'w-100 h-100'
        css = {
          css(
            {
              position: 'relative',
              backgroundImage: `
                url("${
                  props.card.image
                }")
              `
                .trim(),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: filterGet()
            }
          )
        }
      ></div>
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
