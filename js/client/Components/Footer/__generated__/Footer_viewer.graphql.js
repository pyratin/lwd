/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Footer_viewer$ref: FragmentReference;
declare export opaque type Footer_viewer$fragmentType: Footer_viewer$ref;
export type Footer_viewer = {|
  +id: ?string,
  +$refType: Footer_viewer$ref,
|};
export type Footer_viewer$data = Footer_viewer;
export type Footer_viewer$key = {
  +$data?: Footer_viewer$data,
  +$fragmentRefs: Footer_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Footer_viewer",
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
(node/*: any*/).hash = '1c8978b558592969d5bb52532d0f60be';

module.exports = node;
