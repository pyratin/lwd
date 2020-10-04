'use strict';

import React,
{
  cloneElement,
  useEffect,
  useCallback,
  useState,
  useReducer
} from 'react';
import {
  createRefetchContainer,
  graphql
} from 'react-relay';
import Loading from 'Components/Loading';

const DeckDetail = (
  props
) => {

  const [
    deck,
    deckDispatch
  ] = useReducer(
    () => {

      return (
        props.viewer.decks.edges[
          0
        ]
          .node
      );
    }
  );

  const [
    loading,
    loadingSet
  ] = useState(
    false
  );

  const refetchFn = useCallback(
    () => {

      return Promise.resolve(
        loadingSet(
          true
        )
      )
        .then(
          () => {

            return new Promise(
              (
                resolve
              ) => {

                return props.relay.refetch(
                  (
                    fragmentVariables
                  ) => {

                    return {
                      ...fragmentVariables,
                      deckId: props.match.params.deckId
                    };
                  },
                  null,
                  () => {

                    return resolve(
                      null
                    );
                  },
                  {
                    force: true
                  }
                );
              }
            );
          }
        )
        .then(
          () => {

            return deckDispatch();
          }
        )
        .then(
          () => {

            return loadingSet(
              false
            );
          }
        );
    },
    [
      props.relay,
      props.match.params.deckId
    ]
  );

  const refetch = useCallback(
    () => {

      return refetchFn();
    },
    [
      refetchFn
    ]
  );

  useEffect(
    () => {

      refetch();
    },
    [
      refetch
    ]
  );

  const childrenRender = () => {

    return (
      deck &&
      props.children
    ) &&
      cloneElement(
        props.children,
        {
          deck,
          viewer: props.viewer,
          match: props.match
        }
      );
  };

  const loadingRender = () => {

    return (
      loading
    ) &&
      <Loading/>;
  };

  return (
    <div
      className = 'DeckDetail'
    >
      {
        childrenRender()
      }
      {
        loadingRender()
      }
    </div>
  );
};

export default createRefetchContainer(
  DeckDetail,
  {
    viewer: graphql`
      fragment DeckDetail_viewer on Viewer 
      @argumentDefinitions(
        deckFirst: {
          type: "Int!",
          defaultValue: 1
        },
        deckId: {
          type: "ID"
        }
      ) {
        id,
        decks(
          first: $deckFirst,
          deckId: $deckId
        ) @connection(
          key: "Connection_decks"
        ) {
          edges {
            node {
              ...DeckNode_deck
            }
          }
        },
        ...DeckNode_viewer
      }
    `
  },
  graphql`
    query DeckDetailRefetchQuery(
      $deckId: ID!
    ) {
      viewer {
        ...DeckDetail_viewer @arguments(
          deckId: $deckId
        )
      }
    }
  `
);
