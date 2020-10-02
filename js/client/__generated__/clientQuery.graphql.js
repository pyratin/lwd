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

fragment Decks_viewer on Viewer {
  id
}

fragment Viewer_viewer on Viewer {
  id
  deckId
  ...Decks_viewer
}
*/

const node/*: ConcreteRequest*/ = {
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
            "name": "deckId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b25b4eaadd6dc19edc6656eb1e303cd0",
    "id": null,
    "metadata": {},
    "name": "clientQuery",
    "operationKind": "query",
    "text": "query clientQuery {\n  viewer {\n    ...Viewer_viewer\n    id\n  }\n}\n\nfragment Decks_viewer on Viewer {\n  id\n}\n\nfragment Viewer_viewer on Viewer {\n  id\n  deckId\n  ...Decks_viewer\n}\n"
  }
};
// prettier-ignore
(node/*: any*/).hash = '69f623defc9f490b6f9f7298fac25b65';

module.exports = node;
