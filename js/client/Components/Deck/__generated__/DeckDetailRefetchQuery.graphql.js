/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DeckDetail_viewer$ref = any;
export type DeckDetailRefetchQueryVariables = {|
  deckId: string
|};
export type DeckDetailRefetchQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: DeckDetail_viewer$ref
  |}
|};
export type DeckDetailRefetchQuery = {|
  variables: DeckDetailRefetchQueryVariables,
  response: DeckDetailRefetchQueryResponse,
|};
*/


/*
query DeckDetailRefetchQuery(
  $deckId: ID!
) {
  viewer {
    ...DeckDetail_viewer_1o7O2W
    id
  }
}

fragment DeckDetail_viewer_1o7O2W on Viewer {
  id
  decks(first: 1, deckId: $deckId) {
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
    renderText
  }
}

fragment DeckNode_viewer on Viewer {
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "deckId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "deckId",
  "variableName": "deckId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeckDetailRefetchQuery",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "DeckDetail_viewer"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeckDetailRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                      (v2/*: any*/),
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
    "cacheID": "4d79b7ebfb91219c585983954fb55f5b",
    "id": null,
    "metadata": {},
    "name": "DeckDetailRefetchQuery",
    "operationKind": "query",
    "text": "query DeckDetailRefetchQuery(\n  $deckId: ID!\n) {\n  viewer {\n    ...DeckDetail_viewer_1o7O2W\n    id\n  }\n}\n\nfragment DeckDetail_viewer_1o7O2W on Viewer {\n  id\n  decks(first: 1, deckId: $deckId) {\n    edges {\n      node {\n        ...DeckNode_deck\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_deck on Deck {\n  id\n  cards {\n    renderText\n  }\n}\n\nfragment DeckNode_viewer on Viewer {\n  id\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e5a966f463086c020b14a94514c80566';

module.exports = node;
