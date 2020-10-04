'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const DeckNode = (
  props
) => {

  return (
    <div
      className = 'DeckNode'
    >
      maha
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
          renderText
        }
      }
    `,
    viewer: graphql`
      fragment DeckNode_viewer on Viewer {
        id
      }
    `
  }
);
