/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Decks_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Viewer_viewer$ref: FragmentReference;
declare export opaque type Viewer_viewer$fragmentType: Viewer_viewer$ref;
export type Viewer_viewer = {|
  +id: ?string,
  +deckId: ?string,
  +$fragmentRefs: Decks_viewer$ref,
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
      "name": "Decks_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'c57cbf9ca591c22102956956370765c6';

module.exports = node;
