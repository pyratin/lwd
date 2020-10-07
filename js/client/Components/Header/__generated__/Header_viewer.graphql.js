/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Header_viewer$ref: FragmentReference;
declare export opaque type Header_viewer$fragmentType: Header_viewer$ref;
export type Header_viewer = {|
  +id: ?string,
  +$refType: Header_viewer$ref,
|};
export type Header_viewer$data = Header_viewer;
export type Header_viewer$key = {
  +$data?: Header_viewer$data,
  +$fragmentRefs: Header_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_viewer",
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
(node/*: any*/).hash = '47f07e924c7d7561893a88d59becfedd';

module.exports = node;
