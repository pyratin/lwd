'use strict';

import React, 
{
  Fragment
} from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import Card from 'Components/Card';

const DeckNode = (
  props
) => {

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
        cards {
          ...Card_card
        }
      }
    `,
    viewer: graphql`
      fragment DeckNode_viewer on Viewer {
        ...Card_viewer
      }
    `
  }
);
