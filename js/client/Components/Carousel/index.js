'use strict';

import React,
{
  useRef,
  useEffect
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

const Carousel = (
  props
) => {

  const carouselRef = useRef(
    null
  );

  useEffect(
    () => {

      $(
        carouselRef.current
      )
        .carousel();
    }
  );

  return (
    <div
      id = 'Carousel'
      className = 'Carousel carousel w-100 h-100 slide'
    >
      <div
        className = 'carousel-inner w-100 h-100'
      >
        {
          props.children
        }
      </div>

      <a 
        className = 'carousel-control-prev'
        href = '#Carousel'
        role = 'button'
        data-slide = 'prev'
      >
        <div
          className = 'rounded-circle'
          css = {
            css(
              {
                padding: '5px 7px 0px 5px',
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
              }
            )
          }
        >
          <span
            className = 'carousel-control-prev-icon'
          ></span>
        </div>
      </a>

      <a 
        className = 'carousel-control-next'
        href = '#Carousel'
        role = 'button'
        data-slide = 'next'
      >
        <div
          className = 'rounded-circle'
          css = {
            css(
              {
                padding: '5px 5px 0px 7px',
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
              }
            )
          }
        >
          <span
            className = 'carousel-control-next-icon'
          ></span>
        </div>
      </a>
    </div>
  );
};

export default createFragmentContainer(
  Carousel,
  {
    viewer: graphql`
      fragment Carousel_viewer on Viewer {
        id
      }
    `
  }
);
