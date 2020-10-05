'use strict';

import React, 
{
  Fragment
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

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
            <Fragment
              key = {
                index
              }
            >
              <Card
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
            </Fragment>
          );
        }
      );
  };

  return (
    <div
      className = 'DeckNode'
    >
      {
        splashRender()
      }
      {
        cardsRender()
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
        ...Card_viewer
      }
    `
  }
);
