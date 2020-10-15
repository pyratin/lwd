/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Share_viewer$ref: FragmentReference;
declare export opaque type Share_viewer$fragmentType: Share_viewer$ref;
export type Share_viewer = {|
  +id: ?string,
  +$refType: Share_viewer$ref,
|};
export type Share_viewer$data = Share_viewer;
export type Share_viewer$key = {
  +$data?: Share_viewer$data,
  +$fragmentRefs: Share_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Share_viewer",
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
(node/*: any*/).hash = '323cc1aa9746dee28a624e60b5220c4c';

module.exports = node;
