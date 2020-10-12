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
    hero,
    heroSet
  ] = useState(
    null
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
                      deckId: props.match.params.deckId,
                      ...(
                        () => {
                          
                          if (
                            hero
                          ) {

                            return {
                              spoofInput: {
                                hero
                              }
                            };
                          }

                          return {};
                        }
                      )(),
                      genre: process.env.GENRE,
                      refetch: true
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
      props.match.params.deckId,
      hero
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

  const onSplashSpoofInputTriggerHandle = (
    text
  ) => {

    return heroSet(
      text
    );
  };

  const childrenRender = () => {

    return (
      !loading &&
      deck &&
      props.children
    ) &&
      cloneElement(
        props.children,
        {
          deck,
          viewer: props.viewer,
          match: props.match,
          onSplashSpoofInputTrigger: 
            onSplashSpoofInputTriggerHandle
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
      className = 'DeckDetail h-100'
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
        },
        spoofInput: {
          type: "spoofInput"
        },
        genre: {
          type: "String"
        },
        refetch: {
          type: "Boolean",
          defaultValue: false
        }
      ) {
        id,
        decks(
          first: $deckFirst,
          deckId: $deckId,
          spoofInput: $spoofInput,
          genre: $genre
        ) @connection(
          key: "Connection_decks"
        ) {
          edges {
            node {
              id,
              ...DeckNode_deck @include(
                if: $refetch
              )
            }
          }
        },
        ...DeckNode_viewer
      }
    `
  },
  graphql`
    query DeckDetailRefetchQuery(
      $deckId: ID!,
      $spoofInput: spoofInput,
      $genre: String!,
      $refetch: Boolean!
    ) {
      viewer {
        ...DeckDetail_viewer @arguments(
          deckId: $deckId,
          spoofInput: $spoofInput,
          genre: $genre,
          refetch: $refetch
        )
      }
    }
  `
);
