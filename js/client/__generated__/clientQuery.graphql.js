/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Viewer_viewer$ref = any;
export type clientQueryVariables = {||};
export type clientQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: Viewer_viewer$ref
  |}
|};
export type clientQuery = {|
  variables: clientQueryVariables,
  response: clientQueryResponse,
|};
*/


/*
query clientQuery {
  viewer {
    ...Viewer_viewer
    id
  }
}

fragment Card_card on Card {
  image
  renderText
}

fragment Card_viewer on Viewer {
  id
}

fragment DeckDetail_viewer on Viewer {
  id
  decks(first: 1) {
    edges {
      node {
        ...DeckNode_deck
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  ...DeckNode_viewer
}

fragment DeckNode_deck on Deck {
  id
  cards {
    ...Card_card
  }
}

fragment DeckNode_viewer on Viewer {
  ...Card_viewer
}

fragment Deck_viewer on Viewer {
  ...DeckDetail_viewer
}

fragment Home_viewer on Viewer {
  id
}

fragment Viewer_viewer on Viewer {
  id
  deckId
  ...Home_viewer
  ...Deck_viewer
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "clientQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Viewer_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "QUery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "clientQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deckId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "DeckConnection",
            "kind": "LinkedField",
            "name": "decks",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "DeckEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Deck",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Card",
                        "kind": "LinkedField",
                        "name": "cards",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "image",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "renderText",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "decks(first:1)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "deckId"
            ],
            "handle": "connection",
            "key": "Connection_decks",
            "kind": "LinkedHandle",
            "name": "decks"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "39bbf8dffd9f2293c98303408ff9403d",
    "id": null,
    "metadata": {},
    "name": "clientQuery",
    "operationKind": "query",
    "text": "query clientQuery {\n  viewer {\n    ...Viewer_viewer\n    id\n  }\n}\n\nfragment Card_card on Card {\n  image\n  renderText\n}\n\nfragment Card_viewer on Viewer {\n  id\n}\n\nfragment DeckDetail_viewer on Viewer {\n  id\n  decks(first: 1) {\n    edges {\n      node {\n        ...DeckNode_deck\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_deck on Deck {\n  id\n  cards {\n    ...Card_card\n  }\n}\n\nfragment DeckNode_viewer on Viewer {\n  ...Card_viewer\n}\n\nfragment Deck_viewer on Viewer {\n  ...DeckDetail_viewer\n}\n\nfragment Home_viewer on Viewer {\n  id\n}\n\nfragment Viewer_viewer on Viewer {\n  id\n  deckId\n  ...Home_viewer\n  ...Deck_viewer\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '69f623defc9f490b6f9f7298fac25b65';

module.exports = node;
