/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MovieCreateInput = {|
  text: string,
  source?: ?string,
  spoofInput?: ?spoofInput,
  genre?: ?string,
  outputType?: ?string,
  createFlag?: ?boolean,
  clientMutationId?: ?string,
|};
export type spoofInput = {|
  hero?: ?string,
  villain?: ?string,
|};
export type MovieCreateMutationVariables = {|
  input: MovieCreateInput
|};
export type MovieCreateMutationResponse = {|
  +movieCreate: ?{|
    +viewer: ?{|
      +id: ?string,
      +deckTitle: ?string,
    |},
    +output: ?{|
      +splash?: ?{|
        +title: ?string
      |}
    |},
  |}
|};
export type MovieCreateMutation = {|
  variables: MovieCreateMutationVariables,
  response: MovieCreateMutationResponse,
|};
*/


/*
mutation MovieCreateMutation(
  $input: MovieCreateInput!
) {
  movieCreate(input: $input) {
    viewer {
      id
      deckTitle
    }
    output {
      __typename
      ... on Deck {
        splash {
          title
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Viewer",
  "kind": "LinkedField",
  "name": "viewer",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deckTitle",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Deck",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MovieCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MovieCreatePayload",
        "kind": "LinkedField",
        "name": "movieCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "output",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MovieCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MovieCreatePayload",
        "kind": "LinkedField",
        "name": "movieCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "output",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5999c72a01c527fd328d6c215c71235a",
    "id": null,
    "metadata": {},
    "name": "MovieCreateMutation",
    "operationKind": "mutation",
    "text": "mutation MovieCreateMutation(\n  $input: MovieCreateInput!\n) {\n  movieCreate(input: $input) {\n    viewer {\n      id\n      deckTitle\n    }\n    output {\n      __typename\n      ... on Deck {\n        splash {\n          title\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cb03cf7275a693eddb629cc10d28c16b';

module.exports = node;
