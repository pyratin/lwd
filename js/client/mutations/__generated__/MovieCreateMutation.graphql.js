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
      +id?: ?string
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
        id
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
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
      "args": null,
      "kind": "ScalarField",
      "name": "deckTitle",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "output",
            "plural": false,
            "selections": [
              (v4/*: any*/)
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
          (v3/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8dcedc22940438c5220f63b06bef6a3e",
    "id": null,
    "metadata": {},
    "name": "MovieCreateMutation",
    "operationKind": "mutation",
    "text": "mutation MovieCreateMutation(\n  $input: MovieCreateInput!\n) {\n  movieCreate(input: $input) {\n    viewer {\n      id\n      deckTitle\n    }\n    output {\n      __typename\n      ... on Deck {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4ebc85b9f79f4567e00d205a95d12283';

module.exports = node;
