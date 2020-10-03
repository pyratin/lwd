/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeckNode_viewer$ref: FragmentReference;
declare export opaque type DeckNode_viewer$fragmentType: DeckNode_viewer$ref;
export type DeckNode_viewer = {|
  +id: ?string,
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'aaca7b6b8385902aad113dffbd8988a5';

module.exports = node;
