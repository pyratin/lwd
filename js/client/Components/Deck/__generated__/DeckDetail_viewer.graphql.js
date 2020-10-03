/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type DeckNode_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeckDetail_viewer$ref: FragmentReference;
declare export opaque type DeckDetail_viewer$fragmentType: DeckDetail_viewer$ref;
export type DeckDetail_viewer = {|
  +$fragmentRefs: DeckNode_viewer$ref,
  +$refType: DeckDetail_viewer$ref,
|};
export type DeckDetail_viewer$data = DeckDetail_viewer;
export type DeckDetail_viewer$key = {
  +$data?: DeckDetail_viewer$data,
  +$fragmentRefs: DeckDetail_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeckDetail_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeckNode_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '8cbf02cee7b0a7b3455b2ef12745189f';

module.exports = node;
