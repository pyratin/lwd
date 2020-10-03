/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Deck_viewer$ref = any;
type Home_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Viewer_viewer$ref: FragmentReference;
declare export opaque type Viewer_viewer$fragmentType: Viewer_viewer$ref;
export type Viewer_viewer = {|
  +id: ?string,
  +deckId: ?string,
  +$fragmentRefs: Home_viewer$ref & Deck_viewer$ref,
  +$refType: Viewer_viewer$ref,
|};
export type Viewer_viewer$data = Viewer_viewer;
export type Viewer_viewer$key = {
  +$data?: Viewer_viewer$data,
  +$fragmentRefs: Viewer_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Viewer_viewer",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Home_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Deck_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'ccafd542a3ac196d456f1d9881169060';

module.exports = node;
