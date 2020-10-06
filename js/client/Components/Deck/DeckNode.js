'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

import Carousel from 'Components/Carousel';
import Splash from 'Components/Splash';
import Card from 'Components/Card';

const DeckNode = (
  props
) => {

  const splashRender = () => {

    return (
      <Splash
        splash = {
          props.deck.splash
        }
        viewer = {
          props.viewer
        }
        match = {
          props.match
        }
      />
    );
  };

  const cardsRender = () => {

    return props.deck.cards
      .map(
        (
          card,
          index
        ) => {

          return (
            <Card
              key = {
                index
              }
              card = {
                card
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

  const carouselRender = () => {

    return (
      <div
        className = 'carouselContainer'
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
            }
          )
        }
      >
        <Carousel
          viewer = {
            props.viewer
          }
        >
          {
            [
              splashRender(),
              ...cardsRender()
            ]
              .reduce(
                (
                  memo,
                  slide,
                  index
                ) => {

                  if (
                    !index
                  ) {

                    return [
                      ...memo,
                      <div
                        key = {
                          index
                        }
                        className = 'carousel-item active'
                      >
                        {
                          slide
                        }
                      </div>
                    ];
                  }

                  return [
                    ...memo,
                    <div
                      key = {
                        index
                      }
                      className = 'carousel-item'
                    >
                      {
                        slide
                      }
                    </div>
                  ];
                },
                []
              )
          }
        </Carousel>
      </div>
    );
  };

  return (
    <div
      className = 'DeckNode d-flex justify-content-center'
    >
      {
        carouselRender()
      }
    </div>
  );
};

export default createFragmentContainer(
  DeckNode,
  {
    deck: graphql`
      fragment DeckNode_deck on Deck {
        id,
        splash {
          ...Splash_splash
        },
        cards {
          ...Card_card
        }
      }
    `,
    viewer: graphql`
      fragment DeckNode_viewer on Viewer {
        ...Splash_viewer,
        ...Card_viewer,
        ...Carousel_viewer
      }
    `
  }
);
