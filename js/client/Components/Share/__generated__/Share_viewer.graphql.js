/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ShareDownload_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Share_viewer$ref: FragmentReference;
declare export opaque type Share_viewer$fragmentType: Share_viewer$ref;
export type Share_viewer = {|
  +$fragmentRefs: ShareDownload_viewer$ref,
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShareDownload_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e96dcd4012f1cea916a9c5d44d5b5dbf';

module.exports = node;
