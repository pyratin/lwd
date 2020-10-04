/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Card_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeckNode_viewer$ref: FragmentReference;
declare export opaque type DeckNode_viewer$fragmentType: DeckNode_viewer$ref;
export type DeckNode_viewer = {|
  +$fragmentRefs: Card_viewer$ref,
  +$refType: DeckNode_viewer$ref,
|};
export type DeckNode_viewer$data = DeckNode_viewer;
export type DeckNode_viewer$key = {
  +$data?: DeckNode_viewer$data,
  +$fragmentRefs: DeckNode_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeckNode_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Card_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'fc8025a5b26c2df2f71b05a3346a29f9';

module.exports = node;
