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

fragment Card_card on Card {
  image
  renderText
  actorImageId
  dualRoleIndex
}

fragment Card_viewer on Viewer {
  id
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
  splash {
    ...Splash_splash
  }
  cards {
    ...Card_card
  }
}

fragment DeckNode_viewer on Viewer {
  ...Splash_viewer
  ...Card_viewer
}

fragment SplashCharacter_character on Character {
  renderText
  image
}

fragment SplashCharacter_viewer on Viewer {
  id
}

fragment SplashCharacters_splash on Splash {
  characters {
    ...SplashCharacter_character
  }
}

fragment SplashCharacters_viewer on Viewer {
  ...SplashCharacter_viewer
}

fragment Splash_splash on Splash {
  title
  poster
  ...SplashCharacters_splash
}

fragment Splash_viewer on Viewer {
  ...SplashCharacters_viewer
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
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "renderText",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
};
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
                        "concreteType": "Splash",
                        "kind": "LinkedField",
                        "name": "splash",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "poster",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Character",
                            "kind": "LinkedField",
                            "name": "characters",
                            "plural": true,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Card",
                        "kind": "LinkedField",
                        "name": "cards",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "actorImageId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "dualRoleIndex",
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
    "cacheID": "b2b72481c220a9252dbc35a6bb726d46",
    "id": null,
    "metadata": {},
    "name": "DeckDetailRefetchQuery",
    "operationKind": "query",
    "text": "query DeckDetailRefetchQuery(\n  $deckId: ID!\n) {\n  viewer {\n    ...DeckDetail_viewer_1o7O2W\n    id\n  }\n}\n\nfragment Card_card on Card {\n  image\n  renderText\n  actorImageId\n  dualRoleIndex\n}\n\nfragment Card_viewer on Viewer {\n  id\n}\n\nfragment DeckDetail_viewer_1o7O2W on Viewer {\n  id\n  decks(first: 1, deckId: $deckId) {\n    edges {\n      node {\n        ...DeckNode_deck\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_deck on Deck {\n  id\n  splash {\n    ...Splash_splash\n  }\n  cards {\n    ...Card_card\n  }\n}\n\nfragment DeckNode_viewer on Viewer {\n  ...Splash_viewer\n  ...Card_viewer\n}\n\nfragment SplashCharacter_character on Character {\n  renderText\n  image\n}\n\nfragment SplashCharacter_viewer on Viewer {\n  id\n}\n\nfragment SplashCharacters_splash on Splash {\n  characters {\n    ...SplashCharacter_character\n  }\n}\n\nfragment SplashCharacters_viewer on Viewer {\n  ...SplashCharacter_viewer\n}\n\nfragment Splash_splash on Splash {\n  title\n  poster\n  ...SplashCharacters_splash\n}\n\nfragment Splash_viewer on Viewer {\n  ...SplashCharacters_viewer\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e5a966f463086c020b14a94514c80566';

module.exports = node;
