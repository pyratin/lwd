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

fragment DeckDetail_viewer on Viewer {
  ...DeckNode_viewer
}

fragment DeckNode_viewer on Viewer {
  id
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
    "cacheID": "1449b394bbd57fefd783f9e9fdc21e08",
    "id": null,
    "metadata": {},
    "name": "clientQuery",
    "operationKind": "query",
    "text": "query clientQuery {\n  viewer {\n    ...Viewer_viewer\n    id\n  }\n}\n\nfragment DeckDetail_viewer on Viewer {\n  ...DeckNode_viewer\n}\n\nfragment DeckNode_viewer on Viewer {\n  id\n}\n\nfragment Deck_viewer on Viewer {\n  ...DeckDetail_viewer\n}\n\nfragment Home_viewer on Viewer {\n  id\n}\n\nfragment Viewer_viewer on Viewer {\n  id\n  deckId\n  ...Home_viewer\n  ...Deck_viewer\n}\n"
  }
};
// prettier-ignore
(node/*: any*/).hash = '69f623defc9f490b6f9f7298fac25b65';

module.exports = node;
