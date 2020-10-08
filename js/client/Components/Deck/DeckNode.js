'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import Carousel from 'Components/Carousel';
import Splash from 'Components/Splash';
import Card from 'Components/Card';

const DeckNode = (
  props
) => {

  const textElementMinHeight = '6rem';

  const textFontSize = '1.2rem';

  const splashCharacterElementSize = '6rem';

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
        textElementMinHeight = {
          textElementMinHeight
        }
        textFontSize = {
          textFontSize
        }
        splashCharacterElementSize = {
          splashCharacterElementSize
        }
        onSplashSpoofInputTrigger = {
          props.onSplashSpoofInputTrigger
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
              textElementMinHeight = {
                textElementMinHeight
              }
              textFontSize = {
                textFontSize
              }
            />
          );
        }
      );
  };

  const carouselRender = () => {

    return (
      <div
        className = {
          `
            carouselContainer 
            w-100 h-100
            rounded rounded-lg
          `
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
                        className = 
                          'carousel-item w-100 h-100 active'
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
                      className = 
                        'carousel-item w-100 h-100'
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
      className = 
        'DeckNode d-flex justify-content-center h-100'
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
