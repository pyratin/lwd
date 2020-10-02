/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Decks_viewer$ref: FragmentReference;
declare export opaque type Decks_viewer$fragmentType: Decks_viewer$ref;
export type Decks_viewer = {|
  +id: ?string,
  +$refType: Decks_viewer$ref,
|};
export type Decks_viewer$data = Decks_viewer;
export type Decks_viewer$key = {
  +$data?: Decks_viewer$data,
  +$fragmentRefs: Decks_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Decks_viewer",
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
(node/*: any*/).hash = '24b0eab2451daeb60758d1cf3e9cc690';

module.exports = node;
