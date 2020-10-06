/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DeckDetail_viewer$ref = any;
export type DeckDetailRefetchQueryVariables = {|
  deckId: string,
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
  $genre: String
) {
  viewer {
    ...DeckDetail_viewer_3cqaaf
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

fragment DeckDetail_viewer_3cqaaf on Viewer {
  id
  decks(first: 1, deckId: $deckId, genre: $genre) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "deckId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "genre"
  }
],
v1 = {
  "kind": "Variable",
  "name": "deckId",
  "variableName": "deckId"
},
v2 = {
  "kind": "Variable",
  "name": "genre",
  "variableName": "genre"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  (v2/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "renderText",
  "storageKey": null
},
v6 = {
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
              (v1/*: any*/),
              (v2/*: any*/)
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      (v3/*: any*/),
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
                              (v5/*: any*/),
                              (v6/*: any*/)
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
                          (v6/*: any*/),
                          (v5/*: any*/),
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
            "args": (v4/*: any*/),
            "filters": [
              "deckId",
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
    "cacheID": "e77fa86e977851c562b4b9a367e3ad69",
    "id": null,
    "metadata": {},
    "name": "DeckDetailRefetchQuery",
    "operationKind": "query",
    "text": "query DeckDetailRefetchQuery(\n  $deckId: ID!\n  $genre: String\n) {\n  viewer {\n    ...DeckDetail_viewer_3cqaaf\n    id\n  }\n}\n\nfragment Card_card on Card {\n  image\n  renderText\n  actorImageId\n  dualRoleIndex\n}\n\nfragment Card_viewer on Viewer {\n  id\n}\n\nfragment Carousel_viewer on Viewer {\n  id\n}\n\nfragment DeckDetail_viewer_3cqaaf on Viewer {\n  id\n  decks(first: 1, deckId: $deckId, genre: $genre) {\n    edges {\n      node {\n        ...DeckNode_deck\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_deck on Deck {\n  id\n  splash {\n    ...Splash_splash\n  }\n  cards {\n    ...Card_card\n  }\n}\n\nfragment DeckNode_viewer on Viewer {\n  ...Splash_viewer\n  ...Card_viewer\n  ...Carousel_viewer\n}\n\nfragment SplashCharacter_character on Character {\n  renderText\n  image\n}\n\nfragment SplashCharacter_viewer on Viewer {\n  id\n}\n\nfragment SplashCharacters_splash on Splash {\n  characters {\n    ...SplashCharacter_character\n  }\n}\n\nfragment SplashCharacters_viewer on Viewer {\n  ...SplashCharacter_viewer\n}\n\nfragment SplashSpoofInput_viewer on Viewer {\n  id\n}\n\nfragment Splash_splash on Splash {\n  title\n  poster\n  ...SplashCharacters_splash\n}\n\nfragment Splash_viewer on Viewer {\n  ...SplashCharacters_viewer\n  ...SplashSpoofInput_viewer\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '782bc06ac8b85603449576627327cd8f';

module.exports = node;
