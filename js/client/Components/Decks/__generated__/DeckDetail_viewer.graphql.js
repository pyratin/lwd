/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeckDetail_viewer$ref: FragmentReference;
declare export opaque type DeckDetail_viewer$fragmentType: DeckDetail_viewer$ref;
export type DeckDetail_viewer = {|
  +id: ?string,
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
(node/*: any*/).hash = 'e70c080041602dc4f340d4a6e359e3b6';

module.exports = node;
