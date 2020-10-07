/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DeckDetail_viewer$ref = any;
export type spoofInput = {|
  hero?: ?string,
  villain?: ?string,
|};
export type DeckDetailRefetchQueryVariables = {|
  deckId: string,
  spoofInput?: ?spoofInput,
  genre?: ?string,
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
  $spoofInput: spoofInput
  $genre: String
) {
  viewer {
    ...DeckDetail_viewer_7QAmx
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

fragment Carousel_viewer on Viewer {
  id
}

fragment DeckDetail_viewer_7QAmx on Viewer {
  id
  decks(first: 1, deckId: $deckId, spoofInput: $spoofInput, genre: $genre) {
    edges {
      node {
        id
        ...DeckNode_deck
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
  ...Carousel_viewer
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

fragment SplashSpoofInput_viewer on Viewer {
  id
}

fragment Splash_splash on Splash {
  title
  poster
  ...SplashCharacters_splash
}

fragment Splash_viewer on Viewer {
  ...SplashCharacters_viewer
  ...SplashSpoofInput_viewer
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "deckId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "genre"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "spoofInput"
},
v3 = {
  "kind": "Variable",
  "name": "deckId",
  "variableName": "deckId"
},
v4 = {
  "kind": "Variable",
  "name": "genre",
  "variableName": "genre"
},
v5 = {
  "kind": "Variable",
  "name": "spoofInput",
  "variableName": "spoofInput"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  (v4/*: any*/),
  (v5/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "renderText",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
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
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
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
                      (v6/*: any*/),
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
                              (v8/*: any*/),
                              (v9/*: any*/)
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
                          (v9/*: any*/),
                          (v8/*: any*/),
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
            "args": (v7/*: any*/),
            "filters": [
              "deckId",
              "spoofInput",
              "genre"
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
    "cacheID": "15f72072fba1938ebfa0f00b13a3e15b",
    "id": null,
    "metadata": {},
    "name": "DeckDetailRefetchQuery",
    "operationKind": "query",
    "text": "query DeckDetailRefetchQuery(\n  $deckId: ID!\n  $spoofInput: spoofInput\n  $genre: String\n) {\n  viewer {\n    ...DeckDetail_viewer_7QAmx\n    id\n  }\n}\n\nfragment Card_card on Card {\n  image\n  renderText\n  actorImageId\n  dualRoleIndex\n}\n\nfragment Card_viewer on Viewer {\n  id\n}\n\nfragment Carousel_viewer on Viewer {\n  id\n}\n\nfragment DeckDetail_viewer_7QAmx on Viewer {\n  id\n  decks(first: 1, deckId: $deckId, spoofInput: $spoofInput, genre: $genre) {\n    edges {\n      node {\n        id\n        ...DeckNode_deck\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_deck on Deck {\n  id\n  splash {\n    ...Splash_splash\n  }\n  cards {\n    ...Card_card\n  }\n}\n\nfragment DeckNode_viewer on Viewer {\n  ...Splash_viewer\n  ...Card_viewer\n  ...Carousel_viewer\n}\n\nfragment SplashCharacter_character on Character {\n  renderText\n  image\n}\n\nfragment SplashCharacter_viewer on Viewer {\n  id\n}\n\nfragment SplashCharacters_splash on Splash {\n  characters {\n    ...SplashCharacter_character\n  }\n}\n\nfragment SplashCharacters_viewer on Viewer {\n  ...SplashCharacter_viewer\n}\n\nfragment SplashSpoofInput_viewer on Viewer {\n  id\n}\n\nfragment Splash_splash on Splash {\n  title\n  poster\n  ...SplashCharacters_splash\n}\n\nfragment Splash_viewer on Viewer {\n  ...SplashCharacters_viewer\n  ...SplashSpoofInput_viewer\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7ee29e20dd44ac5ee0064efb42a93cc7';

module.exports = node;
